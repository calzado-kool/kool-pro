const CACHE_NAME = 'kool-pro-v1';
const APP_SHELL = ['/kool-pro/'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).then(resp => {
      return resp;
    }).catch(() => caches.match('/kool-pro/')))
  );
});
