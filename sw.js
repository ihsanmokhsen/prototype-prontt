/* Service worker PRO NTT: halaman selalu dicoba dari jaringan dulu (agar update cepat),
   aset (css/js/gambar) diambil dari cache lalu diperbarui di belakang layar.
   Naikkan VERSI bila ingin memaksa semua cache lama dibuang. */
var VERSI = 'prontt-v1';
var INTI = [
  './',
  'index.html',
  'offline.html',
  'manifest.webmanifest',
  'img/icons/icon-192.png',
  'img/lambang-ntt.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSI).then(function (c) { return c.addAll(INTI); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSI; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Halaman HTML: jaringan dulu, cadangan cache, terakhir halaman offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSI).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match('offline.html');
        });
      })
    );
    return;
  }

  // Aset satu domain + font Google + library cdnjs: cache lalu perbarui.
  var bolehCache = url.origin === location.origin ||
    /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(url.hostname);
  if (!bolehCache) return;

  e.respondWith(
    caches.open(VERSI).then(function (c) {
      return c.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    })
  );
});
