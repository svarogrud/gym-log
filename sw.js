// Gym Log service worker.
// App files: network first (always the newest version when online), cache as the offline fallback.
// Fonts: cache first.
const CACHE = 'gym-log-v26';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'anim.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache: 'reload' bypasses the browser's HTTP cache, so a new worker never stores stale files
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => fetch(u, {cache: 'reload'})
      .then(r => { if (r.ok) return c.put(u, r); }).catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return; // Apps Script calls go straight to the network
  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;

  if (isFont) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
      return res;
    }))));
    return;
  }

  e.respondWith(caches.open(CACHE).then(c =>
    fetch(req, {cache: 'no-cache'}).then(res => {
      if (res && res.ok) c.put(req, res.clone());
      return res;
    }).catch(() => c.match(req, {ignoreSearch: true})
      .then(hit => hit || (req.mode === 'navigate' ? c.match('index.html') : undefined))
      .then(hit => hit || Response.error()))
  ));
});
