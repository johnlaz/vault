/* Vault service worker.
   Keep CACHE_VERSION in sync with APP_VERSION in index.html.
   - Navigations: network-first, falling back to the cached app shell (works offline).
   - Same-origin static assets: cache-first.
   - Everything the app needs to start is precached, so a cold offline launch works. */
const CACHE_VERSION = 'v3';
const CACHE_NAME = 'vault-' + CACHE_VERSION;
const CORE_ASSETS = [
  './',
  './index.html',
  './tailwind.css',
  './dexie.min.js',
  './dm-sans.woff2',
  './playfair.woff2',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  // addAll is all-or-nothing: if any core file is missing the install fails loudly
  // and the previous worker keeps running, instead of shipping a half-cached app.
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'version' && event.source) event.source.postMessage({ version: CACHE_VERSION });
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch cross-origin (e.g. optional Excel library)

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put('./index.html', copy)); }
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
