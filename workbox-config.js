module.exports = {
  globDirectory: '.',
  globPatterns: [
    '**/*.{html,json,js,css}'
  ],
  skipWaiting: true,
  swDest: 'sw/sw.js',

  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'images',

      // Only cache 10 images.
      expiration: {
        maxEntries: 10,
      },
    },
  }, {
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:js|css)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'js&css',

      // Only cache 10 images.
      expiration: {
        maxEntries: 10,
      },
    },
  }, {
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:html)$/,

    // Apply a cache-first strategy.
    handler: 'NetworkOnly',
  }],
};
