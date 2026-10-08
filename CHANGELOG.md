# Vault: Phase 2 changelog (v3)

Copy these files over the repo, then DELETE the files listed under "Remove".

| File | What changed | Why |
|---|---|---|
| app/tailwind.css (new) | Tailwind compiled from your existing config, 19 KB | Replaces cdn.tailwindcss.com so styles are available offline |
| app/dexie.min.js (new) | Dexie 4.4.4 self-hosted (same version as before) | Was loaded from cdnjs and never cached by the service worker |
| app/dm-sans.woff2, app/playfair.woff2 (new) | Self-hosted variable fonts (latin) | Replaces Google Fonts |
| app/index.html | Removed Tailwind/Dexie/font CDN tags and inline tailwind.config; added @font-face; version stamp and storage-protection status in Settings; navigator.storage.persist(); SW update toast | Offline fix, visible version, protect IndexedDB from eviction |
| app/service-worker.js | Cache vault-v3. Navigations network-first with cached shell fallback; same-origin assets cache-first; precaches everything needed to start; install fails loudly if a file is missing; ignores cross-origin requests; answers version queries | Real offline launch, no stale HTML, no silent half-cache |
| app/manifest.json | Added id, start_url "./", merged icons (192 any, 512 any maskable) | Stable install identity, one fewer icon file |
| app/icon-512.png | Now the full-bleed (maskable-safe) artwork | Replaces icon-512-maskable.png |
| index.html (landing) | Footer: © 2026 LAZLAB Creations. All Rights Reserved. + lazlab.io@gmail.com | Standard footer |
| README.md | Rewritten with the standard sections (live URLs, repo layout, data & privacy, AI/model setup, deploy/update, changelog) and the two images below | Matches reality |
| docs/banner.svg, docs/how-it-works.svg (new) | README banner and data-flow diagram, self-contained, readable on GitHub light and dark | README visuals |

## Remove
app/.keep, app/download, app/README.md, app/icon-512-maskable.png, icon-512.png (root), apple-touch-icon.png (root)

## Notes
- Existing installs: the new worker (vault-v3) replaces vault-cache-v2 on next online launch and deletes the old cache. No reinstall needed; user data (IndexedDB) is untouched. Reinstall is only needed to pick up the new icon artwork on the home screen.
- Keep APP_VERSION (app/index.html) and CACHE_VERSION (app/service-worker.js) equal when you bump versions.
- Excel import still loads SheetJS from a CDN on demand (online only).
- README live URLs assume the repo is `johnlaz/vault` (https://johnlaz.github.io/vault/). Edit if the repo name differs.
- Not changed (awaiting approval): items 10, 11, 13, 14 (landing polish, design, PBKDF2 iterations, a11y). Screenshots not wired in because none were supplied.

## Verification (headless Chromium simulation)
- Cold offline reload with all servers stopped and HTTP cache disabled: app shell, Tailwind CSS, Dexie, both fonts load from the service worker; Dexie DB opens; no page errors.
- Same test on the previous build: Dexie and Tailwind undefined, page errors.
- node --check passes on all inline scripts and the service worker; manifest parses.
