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

self.addEventListener('fetch', function (event) {
  const requestUrl = new URL(event.request.url);
  console.group(requestUrl)
  console.log(requestUrl)
  if (requestUrl.origin === location.origin) {
    console.log('inner', requestUrl.origin, location.origin)
    if (requestUrl.pathname === '/') {
      console.log('inner inner', requestUrl, pathname)
      event.respondWith(
        caches.open(VERSION).then(function (cache) {
            caches.match(event.request).then(function (response) {
              console.log('match : ', event.request, response)
              return response || fetch(event.request);
            })
          }
        )
      )
    }
  }
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log('match : ', event.request, response)
      return response || fetch(event.request);
    })
  );
  console.groupEnd(requestUrl)
});
