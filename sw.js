const CACHE_NAME = 'kool-pro-1781072094' + new Date().getTime();
const ASSETS = [
  '/kool-pro/',
  '/kool-pro/index.html',
  '/kool-pro/manifest.json'
];

// Instalación: Cacheamos los recursos básicos
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activación: Limpiamos cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Network First (Primero Red, luego Caché)
// Esto asegura que si hay internet, siempre baje la versión más nueva.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
