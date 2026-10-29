// Generated at build time. Do not edit.
const CACHE = 'pixelhavn-e713789923fe';
const FILES = ["./","apple-touch-icon.png","capacitorDriver-Cns8FPK7.js","html2canvas-C02blViA.js","icon-192.png","icon-512.png","icon-maskable-512.png","icon.svg","index-CGS0UKFZ.css","index-CxybyHWV.js","index.es-DJvfcns4.js","index.html","inter-latin-400-normal-C38fXH4l.woff2","inter-latin-400-normal-CyCys3Eg.woff","inter-latin-500-normal-BL9OpVg8.woff","inter-latin-500-normal-Cerq10X2.woff2","inter-latin-600-normal-CiBQ2DWP.woff","inter-latin-600-normal-LgqL8muc.woff2","inter-latin-700-normal-BLAVimhd.woff","inter-latin-700-normal-Yt3aPRUw.woff2","manifest.webmanifest","purify.es-CmFH7t8M.js","rolldown-runtime-BrVfq_k5.js","silkscreen-latin-400-normal-CtPo2yA5.woff2","silkscreen-latin-400-normal-D0DfPJut.woff","silkscreen-latin-700-normal-BjMPLkh0.woff","silkscreen-latin-700-normal-CSE2nhgM.woff2","sql-wasm-browser-OtCrDp4Z.js","sql-wasm.wasm","sqljsDriver-a1r1jNH7.js","web-BUu7X6M7.js","web-Dk2GGUhD.js","web-Ek4MOIG0.js","web-prm0KMyf.js"];
self.addEventListener('install', (e) => {
  // Fetch every file fresh for this version (the query string skips stale browser/CDN copies
  // of files that keep their name between versions, such as the icons) and store it under its plain name.
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(
        FILES.map((f) =>
          fetch(f + (f.includes('?') ? '&' : '?') + 'v=e713789923fe', { cache: 'reload' }).then((r) => {
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
