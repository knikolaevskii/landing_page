# Padel39 mobile menu animation

Standalone reconstruction of the mobile hamburger and menu fade at https://www.padel39.com/, inspected on 22 September 2026. No dependencies, build step, Webflow runtime, external fonts, or remote assets.

## Files

- `index.html`: working demo and copyable button/navigation markup.
- `menu.css`: icon geometry and optional full-screen navigation styles.
- `menu.js`: reusable ES-module initializer.

Serve this folder over HTTP (for example `python3 -m http.server 8000`) and open http://localhost:8000. ES modules need HTTP; do not open the HTML with file://.

## Integration

1. Load `menu.css`.
2. Copy the `.p39-toggle` button from `index.html` into your header.
3. Optionally copy `.p39-panel`, assign a unique ID, and replace demo links.
4. Initialize after the markup exists:

```js
import { createPadelMenu } from './menu.js';
const menu = createPadelMenu(document.querySelector('.p39-toggle'), {
  panel: document.querySelector('#mobile-menu'),
  background: [document.querySelector('main')]
});
// menu.open(); menu.close(); menu.toggle();
// menu.destroy(); // Clean up when unmounting.
```

For **only the hamburger animation**, omit the options:

```js
const menu = createPadelMenu(document.querySelector('.p39-toggle'));
```

Pass real background elements, never ancestors of the button or panel. Use one active full-screen menu per page. Position the button above the panel (z-index 101 vs 100); avoid ancestors that clip the panel or create a lower stacking context. The demo keeps the menu available at all widths; add your own desktop breakpoint if needed.

Customize `--icon-color` and `--open-color` on `.p39-toggle`, and `--menu-background` on `.p39-panel`. Icon dimensions and animation timing are explicitly defined in CSS/JS. The panel is optional, so existing navigation can be wired to the same toggle API.

## Source motion

Verified against the public Webflow bundle's `a-333` / `a-334` action lists, connected to the reference navbar's open/close events:

| Action | Start | Duration | Easing |
| --- | ---: | ---: | --- |
| Open: outer bars 24px → 0px | 0ms | 200ms | inQuint |
| Open: panel opacity 0 → 1 | 0ms | 300ms | CSS ease |
| Open: middle rotates 0° → 45° | 300ms | 400ms | inOutQuint |
| Open: nested bar rotates 0° → 90° | 300ms | 400ms | inOutQuint |
| Close: both rotations return to 0° | 0ms | 400ms | inOutQuint |
| Close: panel fades out | 0ms | 300ms | CSS ease |
| Close: outer bars return to 24px | 400ms | 200ms | linear |
| Close: panel hidden | 600ms | — | — |

The nested bar inherits the parent's rotation, ending at 135° in page coordinates. The original outer bars contract toward their centers. The icon uses the original 24 × 2px bars, 6px gaps, and 48 × 48px target. Quintic easing is calculated directly rather than approximated by a cubic Bézier.

This recreates the animation, not the entire website: demo typography, brand, links, header placement, and surrounding page are placeholders. Panel layout is a simplified mobile layout. Original stylesheet background: #fff3dc.

## Interaction and validation

Native button activation, Escape close, Tab/Shift+Tab focus containment, background inertness, scroll locking, link-click close, cleanup API, reduced-motion support, and interruption from the current icon state are included. Reduced motion removes both icon animation and panel fade.

Browser-checked at 390px and 320px widths, plus desktop: expanded/collapsed attributes, final 45°/90° rotations, 0px/24px bar widths, panel visibility, Tab focus, Escape close, restored body overflow, link close, and absence of horizontal overflow. Reduced-motion branching is implemented but was not tested with OS emulation.

Source CSS: https://cdn.prod.website-files.com/65d108bc26bc0f5d9c9ea6ae/css/padel39-2fd4ab.webflow.shared.5b2a4ab4f.css

Source interactions: https://cdn.prod.website-files.com/65d108bc26bc0f5d9c9ea6ae/js/webflow.schunk.7e27f05e7cb1ce0f.js
