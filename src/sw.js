importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

workbox.setConfig({ debug: false });

workbox.loadModule("workbox-background-sync");

const { registerRoute } = workbox.routing;
const { precacheAndRoute } = workbox.precaching;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const bgSyncPlugin = new BackgroundSyncPlugin("offlineEvents", {
	maxRetentionTime: 24 * 60,
});

const networkFirstList = ["/api/auth/renew", "/api/events"];
const cacheFirstList = [
	"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
	"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
];

precacheAndRoute(self.__WB_MANIFEST);

//
registerRoute(({ request, url }) => {
	if (networkFirstList.includes(url.pathname)) {
		return true;
	}

	return false;
}, new NetworkFirst());

//
registerRoute(({ request, url }) => {
	if (cacheFirstList.includes(url.href)) {
		return true;
	}

	return false;
}, new CacheFirst());

//
registerRoute(
	new RegExp("http://localhost:4000/api/events"),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	"POST"
);

registerRoute(
	new RegExp("http://localhost:4000/api/events/*"),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	"PUT"
);

registerRoute(
	new RegExp("http://localhost:4000/api/events/*"),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	"DELETE"
);
