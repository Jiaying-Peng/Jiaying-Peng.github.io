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

- Primary: https://jiaying.minions.cyou/
- GitHub Pages fallback: https://jiaying-peng.github.io/
- Legacy: https://minions.cyou/jiaying/ redirects to the primary site.

Both deployments serve the same static files and declare the subdomain as the
canonical URL. Keep asset URLs relative. GitHub Pages deploys `master`.
CloudCone serves an independent checkout at `/srv/jiaying-homepage`; update it
to the same commit with `git -C /srv/jiaying-homepage pull --ff-only`.

Caddy serves `jiaying.minions.cyou` from that directory with automatic HTTPS.
The public homepage has its own site block, separate from the knowledge base
and its `noindex` policy. The old `/jiaying/` route redirects permanently,
preserving paths and query strings. Git metadata is not publicly served.

For deployment, back up `/etc/caddy/Caddyfile`, validate any configuration changes
before reloading Caddy, and verify HTTPS, redirects, static assets, repository
commit parity, and `https://minions.cyou/api/health`. Do not redirect visitors to
a new hostname until its DNS and HTTPS are working.
