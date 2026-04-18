const CACHE = 'soomsoom-v1'
const STATIC = ['/', '/feed', '/search', '/bookmarks', '/me', '/offline']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC).catch(() => {})))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  // Skip API and Supabase requests — always network
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) return

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone()
        caches.open(CACHE).then((c) => c.put(e.request, clone))
        return res
      })
      .catch(() => caches.match(e.request))
  )
})
