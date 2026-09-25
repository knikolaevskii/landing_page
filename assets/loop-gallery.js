window.createLoopGallery = function(track) {
  const originals = Array.from(track.children);
  const copies = [];
  const events = new AbortController();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const wrapper = track.parentElement;
  let hovered = false, touching = false, focused = false, frame, last = 0, position;
  let manualUntil = 0, keyboardFocus = false, lastWritten = null;
  const write = left => {
    track.scrollLeft = left;
    lastWritten = track.scrollLeft;
  };
  for (const before of [true, false]) {
    const fragment = document.createDocumentFragment();
    originals.forEach(el => {
      const copy = el.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.alt = '';
      copies.push(copy);
      fragment.appendChild(copy);
    });
    if (before) track.prepend(fragment); else track.append(fragment);
  }
  track.classList.add('is-looping');
  const step = () => originals[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  const span = () => step() * originals.length;
  const normalize = () => {
    const width = span();
    if (!width) return;
    let left = track.scrollLeft;
    while (left < width) left += width;
    while (left >= width * 2) left -= width;
    if (Math.abs(left - track.scrollLeft) > .5) write(left);
    position = left;
  };
  write(span());
  position = track.scrollLeft;
  const listen = (el, event, fn) => el.addEventListener(event, fn, {signal:events.signal, passive:true});
  listen(wrapper, 'mouseenter', () => { hovered = true; });
  listen(wrapper, 'mouseleave', () => { hovered = false; });
  listen(document, 'keydown', e => { if (e.key === 'Tab') keyboardFocus = true; });
  listen(wrapper, 'pointerdown', () => { keyboardFocus = false; focused = false; });
  listen(wrapper, 'focusin', () => { focused = keyboardFocus; });
  listen(wrapper, 'focusout', e => { focused = keyboardFocus && wrapper.contains(e.relatedTarget); });
  listen(track, 'touchstart', () => { touching = true; });
  listen(track, 'touchend', () => { touching = false; manualUntil = performance.now() + 1500; });
  listen(track, 'touchcancel', () => { touching = false; });
  listen(track, 'wheel', () => { manualUntil = performance.now() + 1500; });
  listen(track, 'scroll', () => {
    // Do not discard fractional progress on scroll events caused by autoplay.
    if (track.scrollLeft !== lastWritten) normalize();
  });
  listen(window, 'resize', normalize);
  function tick(now) {
    const delta = Math.min(now - (last || now), 50);
    last = now;
    const rect = track.getBoundingClientRect();
    if (!hovered && !touching && !focused && !motion.matches && !document.hidden && now > manualUntil && rect.bottom > 0 && rect.top < innerHeight) {
      position += delta * .025;
      const width = span();
      if (width && position >= width * 2) position -= width;
      write(position);
    }
    frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
  return {
    move(direction) {
      normalize();
      track.scrollLeft += direction * step();
      normalize();
      manualUntil = performance.now() + 1500;
    },
    destroy() {
      cancelAnimationFrame(frame);events.abort();copies.forEach(el => el.remove());
      track.classList.remove('is-looping');
    }
  };
};
