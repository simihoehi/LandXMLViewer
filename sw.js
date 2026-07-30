const CACHE = 'landxml-viewer-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // App-Shell: cache-first. Alles andere (z.B. three.js von jsdelivr): network-first mit Cache-Fallback.
  const req = event.request;
  if (SHELL.some((s) => req.url.endsWith(s.replace('./', '')))) {
    event.respondWith(caches.match(req).then((res) => res || fetch(req)));
  } else {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
