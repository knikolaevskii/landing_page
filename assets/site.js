/* ===========================================================================
   The Courthouse — shared site logic
   Loaded as a classic <script> in the real <head> of every page, BEFORE
   support.js. It never touches the DOM at load time; it only publishes
   `window.TCH`, which each page's dc-script reads.

   Why this works: the dc-script is evaluated via
       new Function("DCLogic","StreamableLogic","React", src)
   (support.js:842-851), so it closes over globals. And boot() waits on the
   React CDN, so this file has long since executed by then.

   Why we do NOT inject chrome after hydration: everything under #dc-root is
   React-owned (support.js:163-198). Anything injected there is orphaned or
   clobbered on the next setState.
   =========================================================================== */

window.TCH = (function () {
  'use strict';

  /* =========================================================================
     ███  FILL THESE IN  ███
     Every '#' below is a placeholder waiting on the client. This object is the
     ONLY place URLs live — no other file needs editing when they arrive.
     Load any page with ?audit=1 to outline every remaining dead link.
     See PLACEHOLDERS.md.
     ========================================================================= */

  var LINKS = {
    booking:        '#',   // PADEL OS — court booking
    membershipJoin: '#',   // PADEL OS — membership signup / checkout
    events:         '#',   // PADEL OS — events & programmes list
    coaching:       '#',   // PADEL OS — coaching / clinic booking
    tournaments:    '#',   // PADEL OS — tournament entry
    openPlay:       '#',   // PADEL OS — open play sessions
    proShop:        '#',   // online store (client says "coming soon")
    hostEvent:      '#',   // corporate & private event enquiry (form or mailto:)
    partnerWith:    '#',   // partnership enquiry (form or mailto:)
    newsletter:     '#',   // newsletter signup (form action)
    instagram:      '#',   // https://instagram.com/...
    whatsapp:       '#',   // https://wa.me/421...
    privacy:        '#',
    terms:          '#'
  };

  var CONTACT = {
    phoneDisplay: '+421 900 000 000',        // PLACEHOLDER — not a real number
    phoneHref:    'tel:+421900000000',       // PLACEHOLDER
    email:        'hello@thecourthouse.sk',  // PLACEHOLDER — unverified
    addressLine1: 'Na Pántoch 7707/8',
    addressLine2: '831 06 Bratislava, Slovakia',
    maps: 'https://www.google.com/maps/search/?api=1&query=Na%20P%C3%A1ntoch%207707%2F8%2C%20831%2006%20Bratislava%2C%20Slovakia',
    mapsEmbed: 'https://www.google.com/maps?q=Na%20P%C3%A1ntoch%207707%2F8%2C%20831%2006%20Bratislava%2C%20Slovakia&z=17&output=embed',
    hours: { en: 'Mon – Sun · 7:00 – 22:00', sk: 'Po – Ne · 7:00 – 22:00' }
  };

  /* =========================================================================
     NAVIGATION
     One rule, identical on every page: always emit the full cross-page href.
     `goto` is set ONLY for landing-page fragments — onNav uses "does this id
     exist in the current document?" to decide between smooth-scroll and a real
     navigation, so the same list works everywhere.
     ========================================================================= */

  var NAV = [
    { key: 'story',      href: 'our-story.html',       i18n: 'nav.story',      en: 'Our Story' },
    { key: 'play',       href: 'play.html',            i18n: 'nav.play',       en: 'Play' },
    { key: 'club',       href: 'club.html',            i18n: 'nav.club',       en: 'The Club' },
    { key: 'membership', href: 'membership.html',      i18n: 'nav.membership', en: 'Membership' },
    { key: 'whats-on',   href: 'index.html#whats-on',  i18n: 'nav.whatsOn',    en: "What's On", goto: 'whats-on' },
    { key: 'contact',    href: 'index.html#contact',   i18n: 'nav.contact',    en: 'Contact',   goto: 'contact' }
  ];

  /* Dot-rail labels, keyed by section id, across every page. SK comes from
     TCH_SK['rail.<id>']. Ids are unique site-wide so one map serves all pages. */
  var RAIL_EN = {
    /* landing */
    hero: 'Top', story: 'Our Story', play: 'Play', beyond: 'Beyond the Court',
    membership: 'Membership', 'whats-on': "What's On", loop: 'Stay in the Loop',
    partners: 'Partners', contact: 'Contact', game: 'The Game',
    /* our-story.html */
    'story-intro': 'Our Story', idea: 'The Idea', philosophy: 'Our Philosophy',
    social: 'The Social Club', 'the-game': 'The Game', community: 'The Community',
    'this-is': 'This Is The Courthouse',
    /* play.html */
    'play-intro': 'Play', pickleball: 'Pickleball', 'new-to': 'New to Pickleball?',
    'find-your-game': 'Find Your Game', coaching: 'Coaching', badminton: 'Badminton',
    compete: 'Compete & Connect', equipment: 'Equipment', 'play-cta': "Let's Play",
    /* club.html */
    'club-intro': 'Beyond the Court', clubhouse: 'The Clubhouse', 'after-hours': 'After Hours',
    /* membership.html */
    'member-intro': 'Membership', tiers: 'Membership Options', 'member-cta': 'Join the Club'
  };

  /* =========================================================================
     MEMBERSHIP TIERS
     Reconstructed from the client's pricing sheet, which arrived with its
     columns collapsed (the "Elite Player" and "House Member" columns were
     merged into one run of text). Every cell marked `inferred:true` is our
     best reading, NOT a value the client stated unambiguously. These surface
     in-page with a '*' and a footnote, and are listed in PLACEHOLDERS.md.

     Unambiguous from the source: the four tier names and monthly prices, the
     non-member court rates (€27 off-peak / €33 peak), the booking windows
     (7/10/14/21 days), the cancellation windows (—/36/24/12 hours), the
     non-member tournament fee (€20) and rental rate (€5/session).
     ========================================================================= */

  var TIERS = [
    { key: 'none',      featured: false, price: '€0',
      name: { en: 'Non-member',     sk: 'Nečlen' },
      per:  { en: 'pay as you play', sk: 'plaťte za hru' } },
    { key: 'signature', featured: false, price: '€12.90',
      name: { en: 'Signature Club', sk: 'Signature Club' },
      per:  { en: '/ month', sk: '/ mesiac' } },
    { key: 'elite',     featured: false, price: '€22.90',
      name: { en: 'Elite Player',   sk: 'Elite Player' },
      per:  { en: '/ month', sk: '/ mesiac' } },
    { key: 'house',     featured: true,  price: '€34.90',
      name: { en: 'House Member',   sk: 'House Member' },
      per:  { en: '/ month', sk: '/ mesiac' } }
  ];

  /* `teaser:true` rows are the subset shown on the landing page. */
  var FEATURES = [
    { key: 'offpeak', teaser: true,
      label: { en: 'Off-peak court', sk: 'Kurt mimo špičky' },
      cells: [
        { en: '€27 / hr',      sk: '€27 / hod' },
        { en: '15% off',       sk: '15% zľava' },
        { en: '25% off',       sk: '25% zľava' },
        { en: '35% off',       sk: '35% zľava' }
      ] },
    { key: 'peak', teaser: true,
      label: { en: 'Peak court', sk: 'Kurt v špičke' },
      cells: [
        { en: '€33 / hr',      sk: '€33 / hod' },
        { en: '10% off',       sk: '10% zľava' },
        { en: '15% off',       sk: '15% zľava' },
        { en: '20% off',       sk: '20% zľava' }
      ] },
    { key: 'window', teaser: true,
      label: { en: 'Booking window', sk: 'Okno rezervácie' },
      cells: [
        { en: '7 days',  sk: '7 dní' },
        { en: '10 days', sk: '10 dní' },
        { en: '14 days', sk: '14 dní' },
        { en: '21 days', sk: '21 dní' }
      ] },
    { key: 'cancel', teaser: false,
      label: { en: 'Free cancellation', sk: 'Bezplatné zrušenie' },
      cells: [
        { no: true },
        { en: '36 hours', sk: '36 hodín' },
        { en: '24 hours', sk: '24 hodín' },
        { en: '12 hours', sk: '12 hodín' }
      ] },
    { key: 'tournaments', teaser: false,
      label: { en: 'Tournament entry', sk: 'Vstup na turnaj' },
      cells: [
        { en: '€20',     sk: '€20' },
        { no: true },
        { en: '10% off', sk: '10% zľava' },
        { en: '20% off', sk: '20% zľava' }
      ] },
    { key: 'rentals', teaser: true,
      label: { en: 'Racket rental', sk: 'Požičanie rakety' },
      cells: [
        { en: '€5 / session', sk: '€5 / vstup' },
        { en: '50% off',      sk: '50% zľava' },
        { yes: true },
        { yes: true }
      ] },
    { key: 'proshop', teaser: false,
      label: { en: 'Pro Shop', sk: 'Pro Shop' },
      cells: [
        { no: true },
        { no: true },
        { en: '10% off', sk: '10% zľava' },
        { en: '15% off', sk: '15% zľava' }
      ] },
    { key: 'clinics', teaser: false,
      label: { en: 'Clinics', sk: 'Klinky' },
      cells: [
        { no: true },
        { no: true },
        { en: '10% off', sk: '10% zľava' },
        { en: '15% off', sk: '15% zľava' }
      ] },
    /* Source row read "Members-only  -  Yes  10%  15%". A percentage discount
       on a yes/no access right does not parse; we read the intent as "access,
       with a discount on paid members-only sessions at the upper tiers". */
    { key: 'membersOnly', teaser: false, inferred: true,
      label: { en: 'Members-only sessions', sk: 'Podujatia len pre členov' },
      cells: [
        { no: true },
        { yes: true },
        { en: '10% off', sk: '10% zľava' },
        { en: '15% off', sk: '15% zľava' }
      ] },
    { key: 'events', teaser: true,
      label: { en: 'Club events', sk: 'Klubové podujatia' },
      cells: [
        { no: true },
        { en: 'Early access', sk: 'Skorší prístup' },
        { en: 'Priority',     sk: 'Prioritný prístup' },
        { en: 'First access', sk: 'Prvý prístup' }
      ] }
  ];

  /* =========================================================================
     EVENTS — PLACEHOLDER
     Shape matches what a PADEL OS feed would give us. Replace the array; the
     rendering needs no changes. `href:null` falls back to LINKS.events.
     Dates are ISO with an explicit offset so they sort and format correctly.
     ========================================================================= */

  var EVENTS = [
    { id: 'evt-yoga-pickle', date: '2026-10-09T18:30:00+02:00', href: null,
      name:     { en: 'Yoga & Pickle',     sk: 'Yoga & Pickle' },
      category: { en: 'Club Event',        sk: 'Klubové podujatie' } },
    { id: 'evt-open-play',   date: '2026-10-16T18:00:00+02:00', href: null,
      name:     { en: 'Friday Open Play',  sk: 'Piatková Otvorená Hra' },
      category: { en: 'Open Play',         sk: 'Otvorená hra' } },
    { id: 'evt-the-trial',   date: '2026-10-25T10:00:00+02:00', href: null,
      name:     { en: 'The Trial',         sk: 'The Trial' },
      category: { en: 'Tournament',        sk: 'Turnaj' } }
  ];

  /* =========================================================================
     PARTNERS — client says KORATEX only for now, more to follow.
     `logo:null` renders the name as a wordmark instead of a broken image.
     ========================================================================= */

  var PARTNERS = [
    { key: 'koratex', name: 'KORATEX', logo: null, href: null }
  ];

  /* =========================================================================
     LANGUAGE — persisted, because it must now survive cross-page navigation
     ========================================================================= */

  var lang = {
    KEY: 'tch.lang',
    get: function () {
      try {
        var v = localStorage.getItem(this.KEY);
        if (v === 'en' || v === 'sk') return v;
      } catch (e) { /* private mode / disabled storage */ }
      return (navigator.language || '').toLowerCase().indexOf('sk') === 0 ? 'sk' : 'en';
    },
    set: function (v) {
      try { localStorage.setItem(this.KEY, v); } catch (e) {}
      document.documentElement.lang = v;
      window.dispatchEvent(new CustomEvent('tch:lang', { detail: v }));
    }
  };

  /* runs at load, before first paint, so there is no EN -> SK flash */
  document.documentElement.lang = lang.get();

  /* Gate the reveal animation on JS being alive. site.css only hides
     [data-reveal] under html.tch-reveal, so if this file fails to load the copy
     is simply visible rather than stuck at opacity:0. */
  document.documentElement.classList.add('tch-reveal');

  function dict() { return window.TCH_SK || {}; }
  function tr(key, fallback) {
    var d = dict();
    return (document.documentElement.lang === 'sk' && d[key]) || fallback || key;
  }
  /* pick the active-language side of an {en, sk} pair */
  function pick(obj, lg) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lg] || obj.en || '';
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* =========================================================================
     STATIC-PROSE TRANSLATION
     Markup ships English inline; this swaps textContent to Slovak. The English
     original is cached in data-en on first run so switching back is lossless.

     Scoped to a root because dc-import components (SiteNav, SiteFooter) are
     FETCHED ASYNCHRONOUSLY — they mount after the page's own translation pass,
     so each one must translate itself rather than rely on the page catching it.
     ========================================================================= */

  function applyLangTo(root, lg) {
    if (!root) return;
    var d = dict();
    var all = [];
    if (root.hasAttribute && root.hasAttribute('data-i18n')) all.push(root);
    Array.prototype.push.apply(all, root.querySelectorAll('[data-i18n]'));
    all.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!el.dataset.en) el.dataset.en = el.textContent;
      var next = lg === 'sk' ? (d[k] || el.dataset.en) : el.dataset.en;
      if (el.textContent !== next) el.textContent = next;
    });
    /* translatable attributes: data-i18n-attr="aria-label:nav.menu" */
    Array.prototype.forEach.call(root.querySelectorAll('[data-i18n-attr]'), function (el) {
      var spec = el.getAttribute('data-i18n-attr').split(':');
      var attr = spec[0], key = spec[1];
      if (!attr || !key) return;
      if (el.dataset.enAttr === undefined) el.dataset.enAttr = el.getAttribute(attr) || '';
      el.setAttribute(attr, lg === 'sk' ? (d[key] || el.dataset.enAttr) : el.dataset.enAttr);
    });
  }

  /* =========================================================================
     REVEAL-ONCE (sub-pages)
     Returns a teardown function. Re-runnable: already-revealed nodes are
     skipped, so componentDidUpdate can call it again after an sc-if/sc-for
     remount creates fresh, unobserved nodes.
     ========================================================================= */

  /* Content must NEVER be left permanently invisible. Three guards:
       1. the hiding CSS is gated on html.tch-reveal, added below only when JS
          runs — no JS, no hiding;
       2. anything already on screen is revealed synchronously, so above-the-fold
          copy never waits on an async IntersectionObserver callback;
       3. a failsafe timer reveals everything still pending after 4s, so a
          missed or throttled observer can't blank the page.
     Guard 2 also removes a real race: reveal() is called from componentDidMount,
     before the observer has delivered its first records. */
  var REVEAL_FAILSAFE_MS = 4000;

  function reveal(scope) {
    var root = scope || document.body;
    var nodes = Array.prototype.slice.call(root.querySelectorAll('[data-reveal]:not(.rv-in)'));
    if (!nodes.length) return function () {};

    var show = function (el) { el.classList.add('rv-in'); };

    if (reduceMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach(show);
      return function () {};
    }

    var vh = window.innerHeight || document.documentElement.clientHeight;
    var pending = [];
    nodes.forEach(function (el) {
      var r = el.getBoundingClientRect();
      // already on screen (or above it) — reveal now, don't wait for the observer
      if (r.top < vh && r.bottom > 0) show(el);
      else pending.push(el);
    });
    if (!pending.length) return function () {};

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          show(entries[i].target);
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    pending.forEach(function (el) { io.observe(el); });

    var failsafe = setTimeout(function () { pending.forEach(show); }, REVEAL_FAILSAFE_MS);
    return function () { clearTimeout(failsafe); io.disconnect(); };
  }

  /* =========================================================================
     PAGE BASE CLASS
     cfg: { page, ids, snap, parallax, reveal, scrollOffset, darkIds, state }

     IMPORTANT: a subclass must NOT declare `state = {...}` as a class field.
     Field initialisers run after super(), so it would wipe the state set here.
     Pass extra keys via cfg.state instead.
     ========================================================================= */

  function definePage(DCLogic, cfg) {
    cfg = cfg || {};
    var IDS = cfg.ids || [];
    var DARK = cfg.darkIds || ['hero'];

    /* DCLogic (StreamableLogic, support.js:817) is a real ES6 class, so it can
       only be extended with `class ... extends` — calling it with .call() or
       .apply() throws "Class constructor cannot be invoked without 'new'". */
    return class Page extends DCLogic {
      constructor(props) {
        super(props);
        var st = { isMobile: false, menuOpen: false, langMenuOpen: false, lang: lang.get() };
        for (var k in (cfg.state || {})) st[k] = cfg.state[k];
        this.state = st;
        this.cfg = cfg;
        this.items = [];
        this.active = 0;
        this.raf = null;
        this._teardown = [];
        /* these are handed to addEventListener / onClick, so they must be bound */
        this.onScroll = this.onScroll.bind(this);
        this.onNav = this.onNav.bind(this);
      }

      /* --- lifecycle ---------------------------------------------------- */

      componentDidMount() {
        var self = this;
        this.checkSize();

        this._onResize = function () {
          self.checkSize();
          self.applySnap();
          self.collect();
          if (cfg.parallax && window.innerWidth >= 1000 && !self.raf && !reduceMotion()) self.startParallax();
        };
        window.addEventListener('resize', this._onResize);
        window.addEventListener('scroll', this.onScroll, { passive: true });

        this.applySnap();

        /* markup ships English, so only swap when SK is active */
        if (this.state.lang === 'sk') {
          requestAnimationFrame(function () { self.applyLang('sk'); });
        }
        this.syncLangLabel();

        /* The language switcher lives inside the imported SiteNav, which has its
           own state. This is how the page learns the language changed. */
        this._onLangEvent = function (e) { self.setState({ lang: e.detail }); };
        window.addEventListener('tch:lang', this._onLangEvent);

        requestAnimationFrame(function () {
          if (cfg.parallax && !reduceMotion()) self.startParallax();
          self.paintDots(0);
          self.onScroll();
          /* Second frame: reveal() measures getBoundingClientRect to decide what
             is already on screen. Run it before layout settles and every element
             reports top≈0, so the whole page reveals at once and the animation
             is lost. One frame for React's commit, one for layout. */
          requestAnimationFrame(function () {
            if (cfg.reveal) self._teardown.push(reveal(self.sc || document.body));
          });
        });

        /* Cross-page hash landing. Arriving at index.html#contact used to scroll
           before React had rendered any section, so it silently did nothing.
           Two rAFs: one for the render, one for layout to settle. */
        if (location.hash) {
          var id = decodeURIComponent(location.hash.slice(1));
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { self.scrollToId(id, true); });
          });
        }
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('tch:lang', this._onLangEvent);
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = null;
        for (var i = 0; i < this._teardown.length; i++) this._teardown[i]();
        this._teardown = [];
        this.lockScroll(false);
      }

      componentDidUpdate() {
        var self = this;
        this.applySnap();
        if (this.state.lang === 'sk') this.applyLang('sk');
        this.paintDots(this.active);
        this.syncLangLabel();
        this.lockScroll(this.state.menuOpen);
        requestAnimationFrame(function () {
          self.collect();
          /* sc-if / sc-for remounts create fresh nodes the observer never saw */
          if (cfg.reveal) self._teardown.push(reveal(self.sc || document.body));
        });
      }

      /* --- layout ------------------------------------------------------- */

      checkSize() {
        var isMobile = window.innerWidth < 1000;
        if (isMobile !== this.state.isMobile) this.setState({ isMobile: isMobile, menuOpen: false });
      }

      applySnap() {
        var snap = cfg.snap
          && (this.props.snapScroll === undefined ? true : this.props.snapScroll)
          && window.innerWidth >= 1000
          && window.innerHeight >= 620;
        document.documentElement.classList.toggle('tch-snap', !!snap);
      }

      /* the overlay menu used to let the page scroll behind it */
      lockScroll(on) {
        document.body.style.overflow = on ? 'hidden' : '';
      }

      /* --- navigation --------------------------------------------------- */

      scrollToId(id, instant) {
        var el = id && document.getElementById(id);
        if (!el) return false;
        var off = cfg.scrollOffset === 'nav' ? (this.nav ? this.nav.offsetHeight : 0) : 0;
        /* offsetTop is relative to the offset parent and desyncs as soon as a
           section sits inside a positioned ancestor — which sub-pages do */
        var top = el.getBoundingClientRect().top + window.scrollY - off;
        window.scrollTo({ top: top, behavior: (instant || reduceMotion()) ? 'auto' : 'smooth' });
        return true;
      }

      onNav(e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        var self = this;
        var close = function () { if (self.state.menuOpen) self.setState({ menuOpen: false }); };

        /* never hijack new-tab / modified clicks — the old handler swallowed
           every one of them with an unconditional preventDefault() */
        if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
          close();
          return;
        }
        var id = a.getAttribute('data-goto');
        /* the only question that matters: is the target in THIS document? */
        if (!id || !document.getElementById(id)) { close(); return; }
        e.preventDefault();
        this.scrollToId(id);
        close();
      }

      /* --- language ----------------------------------------------------- */

      /* document.body, not sc.parentElement: the page's own prose plus anything
         already mounted. Imported components additionally translate themselves,
         because they finish fetching after this has run. */
      applyLang(lg) { applyLangTo(document.body, lg); }

      syncLangLabel() {
        if (this.langLabel) this.langLabel.textContent = this.state.lang === 'en' ? 'EN' : 'SK';
      }

      /* lang.set dispatches tch:lang, which every listening component (this page
         and the imported SiteNav) reacts to — so the switcher can live anywhere */
      setLang(lg) {
        lang.set(lg);
        this.setState({ lang: lg, langMenuOpen: false });
      }

      /* --- parallax (landing only) -------------------------------------- */

      collect() {
        if (!this.sc || !cfg.parallax) return;
        var cols = new Map();
        var mobile = window.innerWidth < 1000;
        this.items = Array.prototype.map.call(this.sc.querySelectorAll('[data-rv]'), function (el) {
          el.style.transition = 'none';
          el.style.willChange = mobile ? 'auto' : 'transform, opacity';
          el.style.backfaceVisibility = mobile ? '' : 'hidden';
          if (mobile) el.style.transform = '';
          var sec = el.closest('section');
          var grid = null;
          for (var n = el; n && n !== sec; n = n.parentElement) {
            var d = getComputedStyle(n.parentElement).display;
            if (d === 'grid' || d === 'inline-grid') { grid = n.parentElement; break; }
          }
          var key = grid || sec;
          if (key && !cols.has(key)) {
            var gt = grid ? getComputedStyle(grid).gridTemplateColumns : 'none';
            cols.set(key, gt && gt !== 'none' ? gt.split(' ').filter(Boolean).length : 1);
          }
          /* data-rv-delay was always a depth multiplier, never a delay; read the
             new name first so existing markup keeps working during migration */
          var depth = el.getAttribute('data-rv-depth');
          if (depth === null) depth = el.getAttribute('data-rv-delay');
          return {
            el: el,
            sec: sec,
            stacked: (cols.get(key) || 1) < 2,
            img: el.getAttribute('data-rv') === 'img',
            depth: parseFloat(depth || '0'),
            y: 0
          };
        });
      }

      startParallax() {
        var self = this;
        if (reduceMotion()) return;
        this.collect();
        var step = function () {
          if (window.innerWidth < 1000) {
            // mobile: no parallax — park elements at rest and stop the loop (resize restarts it)
            for (var j = 0; j < self.items.length; j++) {
              self.items[j].y = 0;
              self.items[j].el.style.transform = '';
            }
            self.raf = null;
            return;
          }
          var vh = window.innerHeight;
          var vc = window.scrollY + vh / 2;
          for (var i = 0; i < self.items.length; i++) {
            var it = self.items[i];
            if (!it.sec) continue;
            var rect = it.sec.getBoundingClientRect();
            var secTop = rect.top + window.scrollY;
            var secH = rect.height;
            var span = Math.max(vh, secH);
            var t = ((secTop + secH / 2) - vc) / span;
            t = Math.max(-1.1, Math.min(1.1, t));
            var amp = (it.img ? 132 : 104) * (1 + it.depth * 1.15) * (it.stacked ? 0.42 : 1);
            // wide: text descends from above, image rises from below — they meet at centre
            // stacked (one column): both travel the same way, so they can never converge into each other
            var conv = it.stacked ? -1 : (it.img ? 1 : -1);
            var target = t >= 0 ? t * amp * conv : t * amp * 0.62;
            var a = Math.abs(t);
            it.y += (target - it.y) * 0.11;
            it.el.style.transform = it.img
              ? 'translate3d(0,' + it.y.toFixed(2) + 'px,0) scale(' + (1 + a * 0.035).toFixed(4) + ')'
              : 'translate3d(0,' + it.y.toFixed(2) + 'px,0)';
          }
          self.raf = requestAnimationFrame(step);
        };
        step();
      }

      /* --- scroll progress + dot rail ------------------------------------ */

      onScroll() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? window.scrollY / max : 0;
        if (this.bar) this.bar.style.transform = 'scaleX(' + (0.16 + p * 0.84) + ')';
        var vc = window.scrollY + window.innerHeight / 2;
        var idx = 0;
        for (var i = 0; i < IDS.length; i++) {
          var s = document.getElementById(IDS[i]);
          if (!s) continue;                       // id absent on this page — skip, don't reset
          if (s.getBoundingClientRect().top + window.scrollY <= vc) idx = i;
        }
        if (idx !== this.active) { this.active = idx; this.paintDots(idx); }
      }

      paintDots(idx) {
        if (!this.dotWrap) return;
        var dark = DARK.indexOf(IDS[idx]) !== -1;
        var base = dark ? 'rgba(241,234,218,.32)' : 'rgba(42,38,32,.28)';
        var on = dark ? '#f1eada' : '#2a2620';
        Array.prototype.forEach.call(this.dotWrap.querySelectorAll('[data-dot]'), function (d, i) {
          d.style.background = i === idx ? on : base;
          d.style.transform = i === idx ? 'scale(1.55)' : 'scale(1)';
        });
        if (this.bar) {
          this.bar.style.background = dark ? '#f1eada' : '#2a2620';
          this.bar.parentElement.style.background = dark ? 'rgba(241,234,218,.22)' : 'rgba(42,38,32,.18)';
        }
      }

      /* --- template values ----------------------------------------------- */

      renderVals() {
        var self = this;
        var lg = this.state.lang;
        var d = dict();

        var navItems = NAV.map(function (n) {
          return {
            key: n.key,
            href: n.href,
            goto: n.goto || '',
            i18n: n.i18n,
            label: lg === 'sk' ? (d[n.i18n] || n.en) : n.en,
            current: n.key === cfg.page ? 'page' : ''
          };
        });

        var dots = IDS.map(function (id) {
          return { id: id, label: lg === 'sk' ? (d['rail.' + id] || RAIL_EN[id] || id) : (RAIL_EN[id] || id) };
        });

        return {
          page: cfg.page,
          isMobile: this.state.isMobile,
          isDesktop: !this.state.isMobile,
          menuOpen: this.state.menuOpen,
          langMenuOpen: this.state.langMenuOpen,
          isEn: lg === 'en',
          isSk: lg === 'sk',
          lang: lg,

          links: LINKS,
          contact: CONTACT,
          hours: CONTACT.hours[lg] || CONTACT.hours.en,
          navItems: navItems,
          dots: dots,

          scRef:        function (el) { if (el) self.sc = el; },
          navRef:       function (el) { if (el) self.nav = el; },
          barRef:       function (el) { if (el) self.bar = el; },
          dotWrapRef:   function (el) { if (el) self.dotWrap = el; },
          langLabelRef: function (el) { if (el) self.langLabel = el; },

          onScroll: this.onScroll,
          onNav: this.onNav,
          toggleMenu:     function () { self.setState(function (s) { return { menuOpen: !s.menuOpen }; }); },
          toggleLangMenu: function () { self.setState(function (s) { return { langMenuOpen: !s.langMenuOpen }; }); },
          selectEn:       function () { self.setLang('en'); },
          selectSk:       function () { self.setLang('sk'); }
        };
      }
    };
  }

  /* =========================================================================
     DATA HELPERS — resolve {en, sk} content for sc-for rendering.
     Never route generated text through data-i18n: sc-for remounts nodes and
     the imperative textContent swap loses the race against React.
     ========================================================================= */

  /* `featured` stays boolean for logic; `featuredAttr` is the string the
     template binds to data-featured (CSS matches on [data-featured="true"]) */
  function tiers(lg) {
    return TIERS.map(function (t) {
      return { key: t.key, name: pick(t.name, lg), price: t.price,
               per: pick(t.per, lg),
               featured: !!t.featured,
               featuredAttr: t.featured ? 'true' : 'false' };
    });
  }

  function cellText(c, lg) {
    if (c.yes) return '✓';
    if (c.no) return '—';
    return pick(c, lg);
  }

  function rows(lg, teaserOnly) {
    return FEATURES.filter(function (f) { return teaserOnly ? f.teaser : true; }).map(function (f) {
      return {
        key: f.key,
        label: pick(f.label, lg),
        inferred: !!f.inferred,
        cells: f.cells.map(function (c, i) {
          return {
            t: cellText(c, lg),
            yes: !!c.yes,
            no: !!c.no,
            inferred: !!(c.inferred || f.inferred),
            featured: TIERS[i] && TIERS[i].featured ? 'true' : 'false'
          };
        })
      };
    });
  }

  /* the same data pivoted per tier, for the <1000px stacked cards */
  function tierCards(lg, teaserOnly) {
    var rs = rows(lg, teaserOnly);
    return tiers(lg).map(function (t, i) {
      return {
        key: t.key, name: t.name, price: t.price, per: t.per,
        featured: t.featuredAttr,
        rows: rs.map(function (r) {
          return { key: r.key, label: r.label, t: r.cells[i].t, inferred: r.cells[i].inferred };
        })
      };
    });
  }

  function upcoming(n, lg, now) {
    var cut = now ? new Date(now).getTime() : Date.now();
    return EVENTS
      .map(function (e) { return { e: e, ts: new Date(e.date).getTime() }; })
      .filter(function (x) { return isFinite(x.ts) && x.ts >= cut; })
      .sort(function (a, b) { return a.ts - b.ts; })
      .slice(0, n || 3)
      .map(function (x) {
        var fmt;
        try {
          fmt = new Intl.DateTimeFormat(lg === 'sk' ? 'sk-SK' : 'en-GB',
            { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date(x.ts));
        } catch (err) { fmt = x.e.date.slice(0, 10); }
        return {
          id: x.e.id,
          name: pick(x.e.name, lg),
          category: pick(x.e.category, lg),
          dateLabel: fmt,
          dateTime: x.e.date,
          href: x.e.href || LINKS.events
        };
      });
  }

  function partners() {
    return PARTNERS.map(function (p) {
      return { key: p.key, name: p.name, logo: p.logo, noLogo: !p.logo, href: p.href || '' };
    });
  }

  /* "rotating" with one partner would read as a broken carousel */
  function partnersMode() { return PARTNERS.length >= 3 ? 'marquee' : 'static'; }

  /* =========================================================================
     PLACEHOLDER AUDIT
     ========================================================================= */

  (function audit() {
    var unfilled = Object.keys(LINKS).filter(function (k) { return LINKS[k] === '#'; });
    var inferred = FEATURES.filter(function (f) {
      return f.inferred || f.cells.some(function (c) { return c.inferred; });
    }).map(function (f) { return f.key; });

    if (unfilled.length) {
      console.warn('[TCH] ' + unfilled.length + ' unfilled placeholder link(s):', unfilled.join(', '),
        '\n      See PLACEHOLDERS.md. Load any page with ?audit=1 to highlight them.');
    }
    if (inferred.length) {
      console.info('[TCH] pricing rows reconstructed from the garbled source sheet (confirm with client):',
        inferred.join(', '));
    }
    document.documentElement.dataset.tchPlaceholders = String(unfilled.length);
    try {
      if (/[?&]audit=1\b/.test(location.search)) {
        document.documentElement.classList.add('tch-audit');
      }
    } catch (e) {}
  })();

  return {
    LINKS: LINKS,
    CONTACT: CONTACT,
    NAV: NAV,
    TIERS: TIERS,
    FEATURES: FEATURES,
    EVENTS: EVENTS,
    PARTNERS: PARTNERS,
    lang: lang,
    tr: tr,
    pick: pick,
    reduceMotion: reduceMotion,
    reveal: reveal,
    applyLang: applyLangTo,
    definePage: definePage,
    tiers: tiers,
    rows: rows,
    tierCards: tierCards,
    upcoming: upcoming,
    partners: partners,
    partnersMode: partnersMode
  };
})();
