// Offline-first service worker: caches pages and static assets as they are
// visited, so lessons, drills and mock tests keep working without a connection.
const CACHE = "clb9-v2";
// Paths are relative to the worker's scope, so this also works under a sub-path (GitHub Pages).
const SCOPE = new URL(self.registration ? self.registration.scope : self.location.href);
const at = (p) => new URL(p, SCOPE).href;
const PRECACHE = ["./", "learn/", "drills/", "vocab/", "mock/", "cheatsheets/", "planner/", "progress/", "manifest.webmanifest", "icon.svg"].map(at);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (new URL(req.url).pathname.includes("/api/")) return;

  // Network first for pages (fresh content), cache fallback offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match(at("./")))),
    );
    return;
  }
  // Cache first for static assets.
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
