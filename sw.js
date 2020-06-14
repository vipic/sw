const VERSION = 'v1'
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll([
        '/sw/static/static.css',
        '/sw/static/static.js',
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
  if (event.request.url.includes('index.html')) {
    return fetch(event.request);
  // } else if (event.request.url.includes('test.png')) {
  //   return caches.match('/sw/static/test1.png')
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }

});
