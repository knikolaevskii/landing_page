# Design System: Memberships

Source of truth for generating membership / pricing / member-account screens in Google Stitch. Paste the relevant sections into the Stitch prompt alongside the screen description.

## 1. Visual Theme & Atmosphere

A membership page should feel like being handed a key, not shown a price list. The atmosphere is **quiet, editorial, and confident** — closer to a members' club printed programme than a SaaS pricing table. Warm paper ground, deep ink text, one earthen accent used sparingly enough that it reads as a seal rather than a button colour.

Calibration:
- **Density: 4** (Daily App Balanced) — generous air around commitments. A person deciding to pay needs room to think.
- **Variance: 8** (Offset Asymmetric, pushing artsy) — tiers are never presented as equal-weight columns. Hierarchy is stated, not hedged.
- **Motion: 6** (Fluid) — spring-weighted reveals, one perpetual micro-loop on the recommended tier. Nothing bounces, nothing announces itself.

The emotional target: *earned access*. Restraint signals that the membership does not need to shout.

## 2. Color Palette & Roles

- **Bone Paper** (`#F4F2ED`) — Primary page background. Warm off-white, never sterile grey.
- **Raw Surface** (`#FFFFFF`) — Elevated fill for the featured tier and modal sheets only.
- **Charcoal Ink** (`#17161A`) — Primary text, headlines, price figures. The darkest value in the system — pure black is banned.
- **Muted Steel** (`#6E6B73`) — Secondary text, benefit descriptions, billing metadata, disabled states.
- **Whisper Border** (`rgba(23, 22, 26, 0.08)`) — 1px structural rules, tier dividers, input outlines.
- **Burnt Amber** (`#B4601F`) — The single accent. Primary CTA fill, active tier marker, focus ring, checkmark glyphs on included benefits. Saturation ~70% — earthen, not fluorescent.
- **Amber Wash** (`rgba(180, 96, 31, 0.07)`) — Flat tint behind the recommended tier. Replaces any glow or gradient treatment.

One palette across every screen. No warm/cool grey drift between sections. No second accent for "success" or "warning" — use Charcoal Ink with an icon for status, Burnt Amber only for affirmative member actions.

## 3. Typography Rules

- **Display:** `Cabinet Grotesk` — Tier names, headlines, price figures. Track-tight (`-0.02em`), weight-driven hierarchy (500 → 700), scale kept controlled. A £ figure at 4rem reads as confidence; at 8rem it reads as desperation.
- **Body:** `Satoshi` — Benefit lists, billing copy, legal fine print. Relaxed leading (`1.6`), max `65ch` measure, Muted Steel for anything that is not a decision.
- **Mono:** `JetBrains Mono` — Renewal dates, member IDs, invoice numbers, per-seat maths. Any figure that appears in a table or comparison row is monospace so digits align vertically.
- **Banned:** `Inter` (the default-taste tell). Generic system stacks for headline work. All generic serifs (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`). If an editorial serif is wanted for a single pull-quote, only `Instrument Serif` or `Fraunces` — never inside the tier comparison or member dashboard.

Price display rule: currency symbol and billing interval sit at `0.4×` the figure size in Muted Steel. The number itself carries the weight.

## 4. Component Stylings

* **Tier Cards:** Generously rounded (`2rem`). Flat Bone Paper fill with a Whisper Border for standard tiers; Raw Surface fill plus Amber Wash top-edge and a diffused ink-tinted shadow (`0 24px 48px rgba(23,22,26,0.06)`) for the recommended tier only. Elevation exists to say *this one* — if every tier is elevated, none is.
* **Benefit Lists:** Left-aligned rows separated by Whisper Border top rules, not bullet glyphs. Included benefits carry a Burnt Amber checkmark; excluded benefits carry a Muted Steel en-dash and Muted Steel text. Never grey out an entire row into illegibility.
* **Buttons:** Flat. Burnt Amber fill with Bone Paper label for the primary join action; Charcoal Ink 1px outline with transparent fill for secondary. Active state translates `-1px` on Y for tactile push. No outer glow, no gradient, no custom cursor.
* **Toggle (Monthly / Annual):** Segmented pill, Whisper Border track, Charcoal Ink thumb that slides on spring physics. Annual saving shown as a Mono figure beside the label — a real computed number, never "Save 50%".
* **Inputs (payment, member details):** Label above in Muted Steel, field with Whisper Border, focus ring in Burnt Amber at 2px, error text below in Charcoal Ink with an amber leading rule. No floating labels, no placeholder-as-label.
* **Loaders:** Skeletal blocks matching the exact tier-card dimensions, shimmering along X. No circular spinners anywhere.
* **Empty States (member dashboard):** A composed arrangement of the member's first available action — not a shrug illustration and not the words "No data".
* **Error States:** Inline, adjacent to the field or action that failed. Payment failures state the reason and the next step in one sentence.

## 5. Layout Principles

- **Tiers sit in equal columns, ordered by price**, cheapest to dearest left-to-right, with the recommended tier in the middle. Every tier states the same benefits in the same order, so one benefit occupies one horizontal line across all three cards — that alignment is what makes the row scannable, and it is why the columns must be equal. Hierarchy is carried entirely by the recommended card's inverted fill, its badge and its mark; never by making it wider or taller. A separate side-by-side comparison table is banned — it forces horizontal scrolling on a phone and duplicates every price the cards already state.
- **Hero:** left-aligned or split, never centred at this variance level. One primary CTA. The signature technique — small contextual images set inline at type-height between headline words, rounded, acting as visual punctuation. Inline images stack below the headline on mobile.
- **No overlapping elements.** Every element holds its own spatial zone. No absolute-positioned content stacking over text or imagery.
- CSS Grid for all structural layout. No `calc()` percentage arithmetic, no flexbox width maths.
- Page contained at `1400px` max-width, centred, with generous internal padding.
- Full-height sections use `min-h-[100dvh]` — never `h-screen`.
- Vertical rhythm between sections: `clamp(4rem, 9vw, 8rem)`.

## 6. Responsive Rules

- Below `768px`, every multi-column layout collapses to a single column. The recommended tier moves to the top of the stack rather than keeping its source order.
- Horizontal overflow on mobile is a critical failure. The tier scroll rail is the only permitted X-scroll, and it must be deliberate and snap-aligned.
- Headlines scale with `clamp()`. Body text never below `1rem` (`16px`). Fine print never below `0.875rem`.
- All tap targets minimum `44px` — including the billing-interval toggle and every benefit-row info trigger.
- Desktop horizontal nav collapses to a clean full-height mobile sheet. No hamburger-adjacent novelty.
- Section gaps reduce proportionally via `clamp(3rem, 8vw, 6rem)`.

## 7. Motion & Interaction

- Spring physics on every interactive transition: `stiffness: 100, damping: 20`. No linear easing, no `ease-in-out` defaults.
- Tier cards and benefit rows mount in a staggered cascade (`60ms` per item), never all at once.
- One perpetual micro-loop only: a slow Amber Wash shimmer across the recommended tier's top edge. Every other element is still until touched.
- Billing toggle drives a spring-interpolated price figure — digits transition, they do not cut.
- Animate `transform` and `opacity` exclusively. Never `top`, `left`, `width`, `height`.
- Any grain or paper texture lives on a fixed pseudo-element, never on animated nodes.

## 8. Anti-Patterns (Banned)

- No emojis, anywhere, including in benefit lists.
- No `Inter`. No generic serifs. No system-font headlines.
- No pure black (`#000000`).
- No neon glows, outer-glow shadows, or purple/blue AI-gradient treatments.
- No gradient text on headlines.
- No second accent colour.
- No custom mouse cursors.
- No overlapping elements.
- No three-column equal-card pricing grid.
- No centred hero.
- No filler UI text: "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons.
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Unlock your potential".
- No fake round figures: `99.99%`, `50% off`, `10,000+ members`. Use real numbers or no number.
- No generic placeholder names: "John Doe", "Acme", "Nexus". Use plausible, specific names.
- No broken Unsplash links — use `picsum.photos` or inline SVG avatars.
- No "Most Popular" ribbon badge rotated 45° in a corner. Hierarchy comes from layout weight, not stickers.
