this.addEventListener('install', function(event) {
    console.log('sw is installed')
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/sw/static/',
          '/sw/static/style.css',
          '/sw/static/index.js',
        ]);
      })
    );
  });