const VERSION = 'v1'
self.addEventListener('install', function (event) {
  console.log('sw is installed')
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
  console.log('active', event)
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

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function (event) {
  console.log('fetch', event.target)
  event.respondWith(caches.match(event.request).catch(function () {
    return fetch(event.request);
  }).then(function (response) {
    caches.open(VERSION).then(function (cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function () {
    return caches.match('./static/test1.png');
  }));
});
