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
    "url": "assets/js/2.53199750.js",
    "revision": "0d23d7129a45a637fdbae35cfadf2a3f"
  },
  {
    "url": "assets/js/3.0320b502.js",
    "revision": "51b0103143e7c3af783bcbba69a6a6e9"
  },
  {
    "url": "assets/js/4.874face1.js",
    "revision": "8084f01a5f3a41214a6ff85e4d75a30c"
  },
  {
    "url": "assets/js/5.6b4b3fc2.js",
    "revision": "3b2f5e2bd90972009b922a7d62230ae0"
  },
  {
    "url": "assets/js/6.c8eff9c4.js",
    "revision": "0455ae0e1f7572bca58c31426d483849"
  },
  {
    "url": "assets/js/7.4a1e609b.js",
    "revision": "cb1845c30902e953a925c9160b6ddc5f"
  },
  {
    "url": "assets/js/8.f5229649.js",
    "revision": "f1a28c732e1df9d8e29e6ecb8d7788e1"
  },
  {
    "url": "assets/js/9.19e7072c.js",
    "revision": "90be3ef861ae5120b50bb3ab49e64836"
  },
  {
    "url": "assets/js/app.6a194ca3.js",
    "revision": "f681d8c799e361155b1634a903978ccd"
  },
  {
    "url": "index.html",
    "revision": "3fd48a9b606e9200281e4794b4fa23ae"
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
