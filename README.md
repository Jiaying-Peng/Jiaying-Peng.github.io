# Jiaying Peng — Academic Desktop

A static academic homepage presented as a Windows 98 desktop.

## Structure

- `index.html` — all page content and application windows
- `assets/css/academic-desktop.css` — visual system and responsive layout
- `assets/js/desktop.js` — window, taskbar, Start menu, and activity interactions

The site has no build step and does not use Jekyll. GitHub Pages publishes the
files directly from the repository root.

## Local preview

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

## Updating content

Most academic content is maintained in `index.html`. Keep author roles,
publication status, patent status, dates, and external links verified before
publishing. The portrait area is intentionally left blank until a final image is
approved.

## Published sites

- Primary: https://jiaying-peng.github.io/
- Mirror: https://minions.cyou/jiaying/

Both sites serve the same static files. Keep asset URLs relative so the mirror
works below `/jiaying/`. GitHub Pages deploys `master`. The CloudCone mirror is
an independent checkout at `/srv/jiaying-homepage`; update it to the same commit
with `git -C /srv/jiaying-homepage pull --ff-only`. Caddy serves that directory
using `handle_path /jiaying/*` and redirects `/jiaying` to `/jiaying/`.
The knowledge-base application and its data are separate from this checkout.
