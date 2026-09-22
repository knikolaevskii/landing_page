/** Initialize one menu; panel is optional for using just the animated icon.
 * background: page elements made inert while the panel is open (not ancestors
 * of the toggle or panel). Call destroy() before removing the component.
 */
window.createCourtMenu = function(button, { panel = null, background = [], header = null, onChange = () => {} } = {}) {
  const top = button.querySelector('.p39-top');
  const bottom = button.querySelector('.p39-bottom');
  const middle = button.querySelector('.p39-middle');
  const cross = button.querySelector('.p39-cross');
  if (!top || !bottom || !middle || !cross) throw new Error('Missing p39 icon markup');
  if (panel && !panel.id) throw new Error('The menu panel needs a unique id');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  let open = false, frame = 0, timer = 0, destroyed = false;
  let state = { width:24, rotation:0, cross:0 };
  let locked = false, previousOverflow = '', inertStates = [];
  const clamp = t => Math.max(0, Math.min(1, t));
  const quintIn = t => t ** 5;
  const quintInOut = t => t < .5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2;
  const mix = (a,b,t) => a + (b-a)*t;
  function paint() {
    top.style.width = bottom.style.width = `${state.width}px`;
    middle.style.transform = `rotate(${state.rotation}deg)`;
    cross.style.transform = `rotate(${state.cross}deg)`;
  }
  function lock() {
    if (locked || !panel) return;
    locked = true;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inertStates = background.map(el => [el, el.inert]);
    inertStates.forEach(([el]) => { el.inert = true; });
  }
  function unlock() {
    if (!locked) return;
    document.body.style.overflow = previousOverflow;
    inertStates.forEach(([el, value]) => { el.inert = value; });
    locked = false;
  }
  function setOpen(value) {
    if (destroyed || open === Boolean(value)) return;
    open = Boolean(value);
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    onChange(open);
    if (panel) {
      if (open) {
        panel.hidden = false;
        panel.inert = false;
        panel.setAttribute('aria-hidden', 'false');
        void panel.offsetWidth; // Establish opacity:0 before beginning the fade.
        panel.dataset.open = 'true';
        lock();
      } else {
        if (panel.contains(document.activeElement)) button.focus();
        panel.inert = true;
        panel.setAttribute('aria-hidden', 'true');
        panel.dataset.open = 'false';
        // Match the source's 600ms close sequence before display:none.
        timer = setTimeout(() => { panel.hidden = true; unlock(); }, motion.matches ? 0 : 600);
      }
    }
    const from = { ...state };
    const target = open ? {width:0,rotation:45,cross:90} : {width:24,rotation:0,cross:0};
    if (motion.matches) { state = target; paint(); return; }
    const opening = open, start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const widthProgress = clamp((elapsed - (opening ? 0 : 400)) / 200);
      const rotationProgress = quintInOut(clamp((elapsed - (opening ? 300 : 0)) / 400));
      state = {
        width: mix(from.width, target.width, opening ? quintIn(widthProgress) : widthProgress),
        rotation: mix(from.rotation, target.rotation, rotationProgress),
        cross: mix(from.cross, target.cross, rotationProgress)
      };
      paint();
      if (elapsed < (opening ? 700 : 600)) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open menu');
  if (panel) {
    button.setAttribute('aria-controls', panel.id);
    panel.hidden = true; panel.inert = true; panel.setAttribute('aria-hidden', 'true');
  }
  button.addEventListener('click', () => setOpen(!open), {signal:events.signal});
  panel?.addEventListener('click', e => { if (e.target.closest('a[href]')) setOpen(false); }, {signal:events.signal});
  document.addEventListener('keydown', e => {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); button.focus(); }
    if (e.key === 'Tab' && panel) {
      const items = [...(header ? header.querySelectorAll('a[href],button') : [button]), ...panel.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
        .filter(el => !el.disabled && el.tabIndex >= 0 && !el.closest('[inert]') && el.getClientRects().length);
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  }, {signal:events.signal});
  paint();
  return {
    open: () => setOpen(true), close: () => setOpen(false), toggle: () => setOpen(!open),
    destroy() {
      destroyed = true; events.abort(); cancelAnimationFrame(frame); clearTimeout(timer); unlock();
      state = {width:24,rotation:0,cross:0}; paint();
      button.setAttribute('aria-expanded','false'); button.setAttribute('aria-label','Open menu');
      if (panel) { panel.hidden = true; panel.inert = true; panel.dataset.open = 'false'; panel.setAttribute('aria-hidden','true'); }
    }
  };
}
