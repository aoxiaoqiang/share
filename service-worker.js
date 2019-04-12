/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/css/0.styles.18e0c493.css",
    "revision": "f11a8a5443735d75c2e7f7937a93b3e7"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.4bdf8636.js",
    "revision": "4b0339dec2bead233710673a53872427"
  },
  {
    "url": "assets/js/2.99d8ca2c.js",
    "revision": "68b3a2ee1942bb108b2359bad0a00ef6"
  },
  {
    "url": "assets/js/3.0ba4e460.js",
    "revision": "bb4d6c85e0a5994984562dd653532cf1"
  },
  {
    "url": "assets/js/4.b058cb85.js",
    "revision": "d497624c100344f26a5b5115b6b84277"
  },
  {
    "url": "assets/js/5.6b4b3fc2.js",
    "revision": "3b2f5e2bd90972009b922a7d62230ae0"
  },
  {
    "url": "assets/js/6.ce96adea.js",
    "revision": "2d7ab829179d57d24b1b01e2b44d533b"
  },
  {
    "url": "assets/js/7.0b3d3c46.js",
    "revision": "384a5d4d37bb89914c8b9c44b8244cc9"
  },
  {
    "url": "assets/js/8.a95f50b1.js",
    "revision": "ff5deac3e140c9f5df611a87d4ca0bc0"
  },
  {
    "url": "assets/js/9.edbfcfd4.js",
    "revision": "250a3e2d58a4f6853fa55c0ccaa8c771"
  },
  {
    "url": "assets/js/app.fdc30af8.js",
    "revision": "90e91b337911107c18a1d8f8fe4666c8"
  },
  {
    "url": "index.html",
    "revision": "77a6c0fb908fa4f83bc74e14e67eb50f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
