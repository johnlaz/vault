# 🗝️ Vault — Personal & Business Credential Manager

A private, local-first PWA for keeping logins, subscriptions, and important
documents organized — cleanly split between Personal and Business, and
installable straight to your home screen or desktop.

## Features

- **Personal / Business split** — separate spaces for two sides of life, one app
- **Credentials & subscriptions** — logins, billing info, notes, quick reveal/copy
- **Document vault** — attach PDFs and images (IDs, licenses, contracts, policies)
- **Selective sharing** — export just the items you pick into a portable file; importing merges them in without touching or overwriting anything already there
- **Encrypted exports** — optional passphrase protection on backups and shares (AES-256-GCM, PBKDF2)
- **Installable PWA** — works offline once loaded, add to home screen on iOS, Android, or desktop
- **No accounts, no servers** — everything lives in your browser's local database

## Install

Open the hosted page, launch the app from `/app/`, and use your browser's "Add to Home Screen" (iOS/Android)
or the install icon in the address bar (Chrome/Edge desktop). Once installed
it launches full-screen like a native app and keeps working offline.

## Tech

Single HTML app file. Tailwind (precompiled to `app/tailwind.css`), Dexie.js over
IndexedDB for storage, Web Crypto for export encryption. Everything needed to
start is bundled and precached, so it launches offline. The optional Excel import
loads its library on demand and needs a connection. No backend, no tracking.

## Privacy

All data stays on your device unless you explicitly export it. Exports can be
encrypted with a passphrase you choose at export time — that passphrase is
never stored anywhere, so keep it somewhere safe; there's no recovery if it's
lost. The unencrypted vault on-device is only as safe as this device and
browser profile, so treat device access accordingly.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Landing page |
| `app/index.html` | The entire app |
| `app/tailwind.css` | Precompiled Tailwind styles |
| `app/dexie.min.js` | Dexie (IndexedDB), self-hosted |
| `app/dm-sans.woff2` / `app/playfair.woff2` | Self-hosted fonts |
| `app/manifest.json` | PWA install metadata |
| `app/service-worker.js` | Offline caching |
| `app/icon-192.png` / `app/icon-512.png` | App icons (512 is maskable-safe) |
| `app/apple-touch-icon.png` | iOS home screen icon |
