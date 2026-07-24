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
