// Saucers Lineup service worker: keeps the app working offline at the field.
// Bump CACHE when you publish a new version so phones pick up the update.
const CACHE = 'saucers-v12';
const CORE = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png',
  './sponsors/stonebridge.png', './sponsors/skyline.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The published lineup always comes straight from the network so the team sees changes.
  if (url.origin === self.location.origin && (url.pathname.endsWith('/lineup.json') || url.pathname.endsWith('/games.json'))) return;

  // Pages: try the network for the newest version, fall back to the saved copy after 3.5s or when offline.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      // cache:'no-cache' makes the browser check GitHub for a newer page instead of reusing its 10-minute copy.
      // The lineup app is saved as ./index.html; any other page (like /trial/) is saved under its own address.
      const root = new URL(self.registration.scope).pathname;
      const key = (url.pathname === root || url.pathname === root + 'index.html') ? './index.html' : url.pathname;
      const net = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(res => { if (res.ok) cache.put(key, res.clone()); return res; });
      net.catch(() => {});
      try {
        const res = await Promise.race([net, new Promise(r => setTimeout(r, 3500))]);
        if (res) return res;
      } catch (err) {}
      const saved = await cache.match(key);
      return saved || net;
    })());
    return;
  }

  // App files and fonts: serve the saved copy right away, refresh it in the background.
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin === self.location.origin || fonts) {
    e.respondWith(caches.open(CACHE).then(async cache => {
      const hit = await cache.match(req);
      // Our own files: re-check with GitHub so background refreshes get the newest copy. Fonts: normal fetch.
      const net = fetch(fonts ? req : new Request(req, { cache: 'no-cache' })).then(res => {
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
  }
});
