# Placeholders & open questions

Everything the site still needs from the client, in one place.

**All URLs live in one file: `assets/site.js`** (the `LINKS` and `CONTACT` blocks at
the top). Filling one in updates every page at once — no other file needs editing.

To see what's still unfilled in the browser, load any page with **`?audit=1`**, e.g.
`http://localhost:8000/index.html?audit=1`. Every dead link gets a red dashed
outline. The console also logs the list on every page load.

> Run the site over HTTP (`python3 -m http.server 8000`), not by double-clicking
> the files. The shared nav/footer are fetched at runtime and `file://` blocks that.

---

## 1. Links — 14 to supply

All currently `'#'`. In `assets/site.js` → `LINKS`.

### PADEL OS (booking / events platform)

| Key | Used on | What it should point at |
|---|---|---|
| `booking` | landing, play, our-story | Court booking. The main CTA across the site — highest priority. |
| `membershipJoin` | landing, membership | Membership signup / checkout. Also the nav "Reserve" pill on `membership.html`. |
| `events` | landing | Events & programmes list. The brief says users register/sign in first. |
| `coaching` | play | Coaching & clinic booking. |
| `tournaments` | play | Tournament entry. |
| `openPlay` | play | Open play sessions. |

### Forms / enquiries — can be a form URL or `mailto:`

| Key | Used on | What it should point at |
|---|---|---|
| `hostEvent` | landing | Corporate & private event enquiry. |
| `partnerWith` | landing | Partnership enquiry. |
| `newsletter` | landing | Newsletter signup (Mailchimp/Brevo form). |

### Social & legal

| Key | Used on | Note |
|---|---|---|
| `instagram` | landing | Full profile URL. |
| `whatsapp` | landing | `https://wa.me/421…` format. |
| `privacy` | footer (every page) | Privacy policy page. |
| `terms` | footer (every page) | Terms page. |
| `proShop` | *not yet linked* | Reserved. The Pro Shop CTA is deliberately a non-clickable "Coming Soon" label until the store exists. |

---

## 2. Contact details — currently fake

In `assets/site.js` → `CONTACT`.

| Field | Current value | Status |
|---|---|---|
| `phoneDisplay` / `phoneHref` | `+421 900 000 000` | **Placeholder — not a real number.** Now rendered as a tappable `tel:` link, so a wrong number is worse than before. |
| `email` | `hello@thecourthouse.sk` | **Unverified guess.** Not displayed anywhere yet. |
| `addressLine1/2` | Na Pántoch 7707/8, 831 06 Bratislava | Believed correct — please confirm. |
| `hours` | Mon–Sun · 7:00–22:00 | Carried over from the old site — please confirm. |

---

## 3. Membership pricing — reconstructed, needs sign-off

The source pricing sheet arrived with its columns collapsed: the *Elite Player* and
*House Member* columns were merged into a single run of text, so several values had
to be reconstructed by position.

Data lives in `assets/site.js` → `TIERS` and `FEATURES`.

**Read unambiguously from the source** (still worth a glance):

- Tiers and monthly prices: Non-member €0 · Signature Club €12.90 · Elite Player €22.90 · House Member €34.90
- Non-member court rates: €27 off-peak, €33 peak
- Booking windows: 7 / 10 / 14 / 21 days
- Cancellation windows: — / 36 / 24 / 12 hours
- Non-member tournament entry €20; racket rental €5 per session

**Reconstructed — please confirm:**

| Row | Issue |
|---|---|
| **Members-only sessions** | The source read `Members-only  -  Yes  10%  15%`. A percentage discount on a yes/no access right doesn't parse. Read as: no access for non-members, access for Signature, access **plus** 10% / 15% off paid members-only sessions at the upper tiers. Flagged in-page with `*` and a footnote. |

**Two interpretation decisions worth checking:**

1. **Discounts, not absolute prices.** Member court rows are rendered as *"15% off"*
   rather than a euro figure, because the source gave percentages against the
   non-member rate. If those percentages were meant to be final prices instead, the
   table is wrong and needs redoing.
2. **Racket rental at the top two tiers** is shown as included (✓), from *"Free. Free"*
   in the source.

The landing page shows only 5 teaser rows; `membership.html` has the full 10-row grid.
Both render from the same data, so they cannot drift.

---

## 4. Missing assets

| Asset | Needed for | Note |
|---|---|---|
| **KORATEX logo** (SVG preferred) | Partners strip | Currently renders the name as a letter-spaced wordmark — deliberate, so there's no broken-image icon. Drop the file in `assets/` and set `logo:` in `PARTNERS` (`assets/site.js`). |
| Further partner logos | Partners strip | The strip auto-switches from a static centred lockup to a scrolling marquee at **3+** partners. No code change needed. |
| Clubhouse / social photography | `club.html`, landing "Beyond the Court" | Currently reusing arena photography. The brief calls for lifestyle imagery here. |
| Coaching / event photography | `play.html` | Same. |

---

## 5. Event data — placeholder

Three sample events in `assets/site.js` → `EVENTS`, shaped to match a PADEL OS feed.

```js
{ id, date: '2026-10-09T18:30:00+02:00', href: null,
  name: { en, sk }, category: { en, sk } }
```

Replace the array; no rendering changes needed. `href: null` falls back to `LINKS.events`.
The landing shows the **next 3 upcoming** events — past dates are filtered out
automatically, and if none remain the section shows *"The next season's calendar
lands soon."* rather than an empty grid.

Dates are formatted per language (`en-GB` / `sk-SK`) automatically.

---

## 6. Content decisions already made

Worth a skim in case any contradict intent:

- **Editorial notes in the brief were not published.** The source document interleaves
  instructions to the designer with actual copy — *"This is the section I'd use to
  resolve the apparent contradiction…"*, *"transition into large lifestyle
  photography"*, *"Make it visual into tables like padel39.com"*, *"Put a simple
  illustrated court diagram…"*. These are treated as direction, not content.
- **The court diagram** requested in section 2C is built as inline SVG (not an image):
  its labels translate with the rest of the site, it recolours with the palette, and
  it's ~4 KB instead of another multi-megabyte PNG.
- **"Rotating brand logos"** degrades by count — see §4.
- **Brand name spelling is inconsistent in the source** ("The Courthouse" vs "The Court
  House"). New copy uses **The Courthouse**; the logo asset and the older landing
  strings still read "The Court House". Worth settling on one.

---

## 7. Known gaps not yet addressed

- **Privacy / Terms pages** don't exist — the footer links need both a URL and a page.
- **PNG fallbacks are still on disk.** Every image now loads as WebP (verified: the
  browser fetches zero PNGs), but the original PNGs remain as `<picture>` fallbacks,
  so `assets/` is ~70 MB on disk while a visitor downloads ~0.4 MB of images.
  Every browser released since 2020 supports WebP. If you don't need to support
  anything older, deleting the PNG fallbacks and the `<img src="…png">` lines would
  cut the deploy by ~66 MB. Left in place as the safe default — your call.
- **`hero-video.mp4` is 3.85 MB** and is now the single largest thing a visitor
  downloads — larger than every image on the site combined. Worth re-encoding.
- **Git history still contains the deleted/original assets**, so cloning the repo
  still pulls ~220 MB. Only a history rewrite would change that; not attempted.
- **The `support.js` runtime loads React from unpkg** with SRI. The site renders blank
  without CDN access. Self-hosting would mean editing `support.js`, which is generated
  and marked do-not-edit.
