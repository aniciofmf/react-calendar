importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");
const { registerRoute } = workbox.routing;
const { precacheAndRoute } = workbox.precaching;
const { CacheFirst, NetworkFirst } = workbox.strategies;
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(new RegExp("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"), new CacheFirst());
registerRoute(new RegExp("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"), new CacheFirst());
registerRoute(new RegExp("http://localhost:4000/api/auth/renew"), new NetworkFirst());
registerRoute(new RegExp("http://localhost:4000/api/events"), new NetworkFirst());
