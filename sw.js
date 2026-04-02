const CACHE_NAME = 'vi-formation-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/meetings.html',
  '/meeting-details.html',
  '/mentions-legales.html',
  '/assets/css/templatemo-edu-meeting.css',
  '/assets/css/fontawesome.css',
  '/assets/css/owl.css',
  '/assets/css/lightbox.css',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/js/custom.js',
  '/assets/js/owl-carousel.js',
  '/assets/js/isotope.min.js',
  '/assets/js/tabs.js',
  '/assets/js/video.js',
  '/assets/js/slick-slider.js',
  '/assets/js/lightbox.js',
  '/icon-192.jpeg',
  '/icon-512.jpeg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});