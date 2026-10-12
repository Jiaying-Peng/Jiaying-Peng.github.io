# Jiaying Peng — Academic Desktop

A bilingual, static academic homepage with a Windows 98 desktop on larger
screens and a single-column reading layout on phones.

- Primary: https://jiaying.minions.cyou/
- GitHub Pages fallback: https://jiaying-peng.github.io/
- Legacy `/jiaying/` URLs redirect permanently, preserving paths and queries.

## Editing and verification

`data/publications.json` is the single source for paper titles, summaries,
authors, journal details, author roles and Chinese translations. The generator
uses it for research highlights, the home update, publication records, news,
CV, counts and BibTeX. Crossref snapshots in `data/crossref-*.json` document
bibliographic verification on 12 October 2026. Dates in the UI use the year:
Crossref online dates can differ from the publisher's earliest posting date.
Missing volume/page details are deliberately omitted. Author roles and cover
status retain the previously verified site records; do not infer contributions
or correspondence solely from author order.

Edit `templates/index.html` for other content. Do not hand-edit generated
`index.html`, `citations/*.bib` or `assets/js/publications-i18n.js`.

```sh
python3 tools/build.py
python3 tools/build.py --check
python3 tools/check.py
node --check assets/js/desktop.js
node --check assets/js/i18n.js
python3 -m http.server 4173
```

Commit source and generated files together. GitHub Pages serves committed files
without a server-side build. The deployment preflight checks generated freshness and resource/route
integrity. `deploy/github-actions-validation.yml` is an optional CI template;
it is not installed because the current GitHub OAuth token lacks workflow scope. Preview desktop and phone layouts, Chinese/English, direct links,
browser Back, keyboard focus, BibTeX downloads and CV printing before publishing.

Public routes: `#profile`, `#research`, `#publications`, `#activities`, `#cv`,
`#contact`, and each stable paper ID, e.g. `#pub-2026`. Refresh and browser history
restore the target window. Translation is immediate by default; the optional
retro animation is available in Start. Basic content remains readable without JS.

## Assets and scholarly presentation

- `assets/css/academic-desktop.css`: responsive layout and print styling.
- `assets/js/desktop.js`: windows, routing, focus and clipboard actions.
- `assets/js/i18n.js`: language switching and general UI translations.
- `assets/icons/`: original SVG desktop symbols, under the project MIT license.
- `assets/figures/`: original conceptual diagrams, **not experimental data**.
- `assets/vendor/`: pinned 98.css 0.1.20 and its bundled fonts; MIT license included.

No runtime CDN dependency is required for the interface. Cloudflare Analytics
remains optional external telemetry; a loaded script is not proof of ingestion.
No portrait, private email address, unverified figure, performance number or
personal contribution statement is invented. Scholarly links are retained.
The site has canonical/social metadata, ProfilePage/Person structured data,
robots.txt and a sitemap. These enable discovery but do not guarantee indexing.

## CloudCone deployment

The public website is separate from the knowledge base and its `noindex` policy.
Caddy serves `/srv/jiaying-site/current` for `jiaying.minions.cyou`, using automatic
HTTPS. `/srv/jiaying-homepage` retains the earlier checkout for recovery.

`jiaying-homepage.timer` runs every five minutes (with up to 20 seconds jitter).
The unprivileged `jiaying-deploy` service fetches the public GitHub `master` from
`/srv/jiaying-site/repository`, extracts the exact commit, verifies generated
content and resources, then exports only public files to a versioned release.
It switches `current` atomically, checks the origin via certificate-verified
HTTPS and byte-compares the page. A failed post-switch check restores the prior
release. A failed preflight leaves the live site untouched. Prior releases stay
available; `previous` points to the immediately preceding successful release.
Git metadata, source data and deployment tooling are not in the public export.

The installed runner is `/usr/local/libexec/jiaying-deploy.py`, copied from
`tools/deploy.py`. Updating the runner or systemd units is an explicit maintenance
operation; automatic content pulls do not replace the installed runner.

```sh
ssh cloudcone 'systemctl start jiaying-homepage.service'
ssh cloudcone 'systemctl status jiaying-homepage.timer --no-pager'
ssh cloudcone 'journalctl -u jiaying-homepage.service -n 30 --no-pager'
curl https://jiaying.minions.cyou/version.txt
```

For a rollback, stop the timer, point `current` atomically at a chosen retained
release, and verify origin HTTPS and public content before re-enabling sync.
Otherwise the next scheduled run would redeploy `master`. For Caddy changes,
back up `/etc/caddy/Caddyfile`, validate before reload, and verify the knowledge
base `/api/health` plus `/duo/`. Never alter their data or VPN configuration.
