repo: knikolaevskii/landing_page
branch: main

## Last sync
date: 2026-08-20T20:37:58Z

### Updated in this project
- Copy now matches the live site verbatim (hero headline, story, how-to-play, membership, contact) in both EN and SK; the SK dictionary was lifted from `index.html`.
- Section order matches the live site: Hero → Our Story → How to Play → Membership → Contact + footer. The extra "The Club" panel was removed.
- Membership rebuilt as a text/image split using `assets/membership.png`, matching the live layout.
- Motion: scroll-linked parallax (text descends, image rises, they meet at centre), per-section column detection so stacked layouts never collide.
- `assets/hero-courts.png` and `assets/history.png` could not be imported (>30 MB); hero and story use the arena photography already in the project.

## Screen map
| Project screen | Repo files |
| --- | --- |
| Landing Page.dc.html | index.html (nav, section order, all EN/SK copy), membership.html (membership CTA copy), assets/logo-beige.svg, assets/logo-dark-green-house.svg, assets/how-to-play.png, assets/membership.png |

## Notes
Files to commit upstream: `Landing Page.dc.html`, `assets/arena-wide.png`, `assets/arena-nets.png`, `github.md`. `support.js` is already in the repo and unchanged.

## Sync history
- 2026-08-19T17:05:32Z — initial build: scroll-snap landing page, dot rail, EN/SK switching, brand assets pulled from the repo.
