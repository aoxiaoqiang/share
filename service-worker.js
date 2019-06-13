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
    "url": "assets/js/10.77367f05.js",
    "revision": "d70b3a90ff193798dd596435022a3503"
  },
  {
    "url": "assets/js/11.0a8ec6e6.js",
    "revision": "433c9456ee32cb855b4b0b09ed77f795"
  },
  {
    "url": "assets/js/12.9226fa38.js",
    "revision": "b4de1b7a7b37bcb7b79a5513d3c2f1e1"
  },
  {
    "url": "assets/js/13.8646d975.js",
    "revision": "739128ba1ea2ba8107f246c3ec1a7a27"
  },
  {
    "url": "assets/js/2.1669a297.js",
    "revision": "7636b2768fb3e61408647b7153351875"
  },
  {
    "url": "assets/js/3.575a718f.js",
    "revision": "3200e339eeab1f07221ceecf6befb5c9"
  },
  {
    "url": "assets/js/4.464fa5b5.js",
    "revision": "97eda30cb86f55a6450be5af751b92b9"
  },
  {
    "url": "assets/js/5.afc21057.js",
    "revision": "32b6ad7a350c27f67a1e93479ee65fec"
  },
  {
    "url": "assets/js/6.0b889c3b.js",
    "revision": "9df930f3d7f5a83d30fd8288008ec27b"
  },
  {
    "url": "assets/js/7.8541c6e9.js",
    "revision": "460c322949702db6eb7b99fe52306917"
  },
  {
    "url": "assets/js/8.0a84fb0f.js",
    "revision": "32528baf7be61919c30a4502acb729a1"
  },
  {
    "url": "assets/js/9.413abfde.js",
    "revision": "5c5518c6029ae34ac33fdf2504751e9e"
  },
  {
    "url": "assets/js/app.5bb9b872.js",
    "revision": "72ee3b45313776962cc2284cd83595f2"
  },
  {
    "url": "index.html",
    "revision": "06d493fa79ab4f2fc8a88926c5130928"
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
