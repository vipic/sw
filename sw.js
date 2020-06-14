const VERSION = 'v1'
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll([
        '/sw/static/index.css',
        '/sw/static/index.js',
        '/sw/static/test.png',
        '/sw/static/test1.png',
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  const requestUrl = new URL(event.request.url);
  if(event.request.url.includes('index.html')) {
    return fetch(event.request);
  }
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(
        caches.open(VERSION).then(function (cache) {
            caches.match(event.request).then(function (response) {
              return response || fetch(event.request);
            })
          }
        )
      )
    }
  }
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
