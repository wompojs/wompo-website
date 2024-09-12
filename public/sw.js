const CACHE_NAME = `cache-v1.0.17-patch-0`;

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function (cacheName) {
						return cacheName !== CACHE_NAME;
					})
					.map(function (cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll([
				// HTML Pages
				`/?v=${CACHE_NAME}`,
				`/docs/introduction?v=${CACHE_NAME}`,
				// JS
				'/wompo/dist/wompo.js',
				'/wompo-router/wompo-router.js',
				'/wompo/jsx-runtime.js',
				'/components/Code.js',
				'/components/Header.js',
				'/components/Footer.js',
				'/components/Home/BuiltInCssModules.js',
				'/components/Home/CSSModuleNadMore.js',
				'/components/Home/CounterComponent.js',
				'/components/Home/ExampleSection.js',
				'/components/Home/MoreWidget.js',
				'/components/MainContent.js',
				'/components/ContentSection.js',
				'/components/FollowDocButton.js',
				'/components/SideMenu.js',
				'/components/SubMenu.js',
				'/components/MenuIcon.js',
				'/components/LoadingPlaceholder.js',
				'/layout/Layout.js',
				'/utils/routes.js',
				'/utils/getPageLayout.js',
				'/App.js',
				// CSS
				'/home.css',
				// Assets
				'/kofi.png',
				// JS Pages
				'/pages/NotFound.js',
				'/pages/docs/Introduction.js',
			]);
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method === 'GET') {
		event.respondWith(
			(async () => {
				const cache = await caches.open(CACHE_NAME);

				// Get the resource from the cache.
				const cachedResponse = await cache.match(event.request);
				if (cachedResponse && !event.request.url?.includes('sw.js')) {
					return cachedResponse;
				} else {
					try {
						// If the resource was not in the cache, try the network.
						const fetchResponse = await fetch(event.request);
						// Save the resource in the cache and return it.
						if (!event.request.url?.includes('sw.js'))
							cache.put(event.request, fetchResponse.clone());
						return fetchResponse;
					} catch (e) {
						// The network failed.
					}
				}
			})()
		);
	}
});
