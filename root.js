self.addEventListener('install', function (event) {
  console.log('sw is installed')
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/sw/static/index.css',
        '/sw/static/index.js',
        '/sw/static/test.png',
        '/sw/static/test1.png',
      ]);
    })
  );
});


self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.pathname === '/test.png') {
    event.respondWith(caches.match('/test1.png'));
  }
});
