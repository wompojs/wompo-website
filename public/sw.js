/*
 * KILL-SWITCH SERVICE WORKER
 *
 * Previous versions of the docs registered a fetch-intercepting SW under scope "/". We no
 * longer want one. This file deliberately replaces the legacy script: any browser that still
 * had the old SW registered will, on its next update check, fetch this version, install it,
 * and on activate clear every cache and unregister itself.
 *
 * Deliberately NO call to `clients.navigate()` here. The page-side cleanup snippet handles
 * the one-shot reload, guarded by sessionStorage. If we reloaded from inside the SW too, the
 * page would re-register the SW on the next load, which would activate, reload, … forever.
 */

self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			await self.clients.claim();
			const cacheNames = await caches.keys();
			await Promise.all(cacheNames.map((name) => caches.delete(name)));
			await self.registration.unregister();
		})(),
	);
});

// While this SW is briefly alive, never serve from cache: always pass through to the network.
self.addEventListener('fetch', (event) => {
	event.respondWith(fetch(event.request));
});
