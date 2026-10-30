// Generated at build time. Do not edit.
const CACHE = 'pixelhavn-debcbc37e254';
const FILES = ["./","apple-touch-icon.png","capacitorDriver-BIwI31FX.js","html2canvas-C02blViA.js","icon-192.png","icon-512.png","icon-maskable-512.png","icon.svg","index-C094Xro9.js","index-dFNbs52o.css","index.es-shZQK89q.js","index.html","inter-latin-400-normal-C38fXH4l.woff2","inter-latin-400-normal-CyCys3Eg.woff","inter-latin-500-normal-BL9OpVg8.woff","inter-latin-500-normal-Cerq10X2.woff2","inter-latin-600-normal-CiBQ2DWP.woff","inter-latin-600-normal-LgqL8muc.woff2","inter-latin-700-normal-BLAVimhd.woff","inter-latin-700-normal-Yt3aPRUw.woff2","manifest.webmanifest","purify.es-CmFH7t8M.js","rolldown-runtime-BrVfq_k5.js","silkscreen-latin-400-normal-CtPo2yA5.woff2","silkscreen-latin-400-normal-D0DfPJut.woff","silkscreen-latin-700-normal-BjMPLkh0.woff","silkscreen-latin-700-normal-CSE2nhgM.woff2","sql-wasm-browser-173ZQI7g.js","sql-wasm.wasm","sqljsDriver-fgwe4R4R.js","supabaseBackend-C4tD_80-.js","web-DOTbMpAd.js","web-WEDAyQu3.js","web-_qOxCEf3.js","web-rPPWxoSa.js"];
self.addEventListener('install', (e) => {
  // Fetch every file fresh for this version (the query string skips stale browser/CDN copies
  // of files that keep their name between versions, such as the icons) and store it under its plain name.
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(
        FILES.map((f) =>
          fetch(f + (f.includes('?') ? '&' : '?') + 'v=debcbc37e254', { cache: 'reload' }).then((r) => {
            if (!r.ok) throw new Error(f + ' ' + r.status);
            return c.put(f, r);
          }),
        ),
      ),
    ).then(() => self.skipWaiting()),
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pixelhavn-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
// Push notifications for schedule changes (iPhone home-screen app, desktop browsers).
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: 'PixelHavn', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'PixelHavn', {
    body: d.body || '', tag: d.tag, icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' },
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { c.postMessage({ type: 'open-calendar' }); return c.focus(); } }
    return self.clients.openWindow('./?open=calendar');
  }));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Pages: try the network briefly so updates arrive, fall back to the cached app when offline.
  if (req.mode === 'navigate') {
    const cached = () => caches.match('index.html', { ignoreSearch: true }).then((r) => r || caches.match('./'));
    e.respondWith(
      new Promise((resolve, reject) => {
        let done = false;
        const finish = (r) => { if (!done && r) { done = true; resolve(r); } };
        const net = fetch(req);
        // Slow connection: show the cached app after 2.5 s instead of waiting.
        setTimeout(() => cached().then(finish), 2500);
        net.then((r) => (r.ok ? finish(r) : cached().then((c) => finish(c || r))))
          .catch(() => cached().then((c) => (c ? finish(c) : !done && reject(new Error('offline')))));
      }),
    );
    return;
  }
  // Everything else is versioned by file name: cache first.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
