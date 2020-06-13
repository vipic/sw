this.addEventListener('install', function (event) {
  console.log('sw is installed')
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/sw/static/index.css',
        '/sw/static/index.js',
      ]);
    })
  );
});


this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
  ).then((response) => {
    if (response !== undefined) {
      return response
    } else {
      fetch(event.request).then(res => {
        let resClone = res.clone();

        caches.open('v1').then((cache) => {
          cache.put(event.request, resClone)
        })
        return res
      }).catch(err => {
        console.error(err)
      })
    }

  });
});
