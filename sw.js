const CACHE_NAME = 'quiz-cache-v6';
const FILES = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sw.js',

  // 문제에서 쓰이는 모든 이미지
  './1.png',
  './2.png',
  './3.png',
  './4.png',
  './5.png',
  './6.png',
  './7.png',
  './8.png',
  './9.png',
  './10.png',
  './11.png',
  './12.png',
  './13.png',
  './14.png',
  './15.png',
  './16.png',
  './17.png',
  './18.png',
  './19.png',
  './20.png',
  './21.png',
  './22.png',
  './23.png',
  './24.png',
  './25.png',
  './26.png',
  './27.png',
  './28.png',
  './29.png',
  './30.png',
  './31.png',
  './32.png',
  './33.png',
  './34.png',
  './35.png',
  './36.png',
  './37.png',
  './38.png',
  './39.png',
  './40.png',
  './41.png',
  './42.png',
  './43.png',
  './44.png',
  './45.png',
  './46.png',
  './47.png',
  './48.png',
  './49.png',
  './50.png',
  './51.png',
  './52.png',
  './53.png',
  './54.png',
  './55.png',
  './56.png',
  './57.png',
  './58.png',
  './59.png',
  './60.png',
  './61.png',
  './62.png',
  './63.png',
  './64.png',
  './65.png',
  './66.png',
  './67.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  // 쿼리스트링 제거해서 캐시 매치
  let url = new URL(evt.request.url);
  url.search = '';
  const reqNoQuery = new Request(url, { method: evt.request.method, headers: evt.request.headers });

  evt.respondWith(
    fetch(evt.request).then(resp => {
      if (evt.request.method === 'GET' && resp.ok) {
        caches.open(CACHE_NAME).then(cache => cache.put(reqNoQuery, resp.clone()));
      }
      return resp;
    }).catch(() => caches.match(reqNoQuery).then(m => m || Promise.reject('no-match')))
  );
});
