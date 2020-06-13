this.addEventListener('install', function(event) {
    console.log('sw is installed')
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/sw/index.html',
          '/sw/static/index.css',
          '/sw/static/index.js',
        ]);
      })
    );
  });