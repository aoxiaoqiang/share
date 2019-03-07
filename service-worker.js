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
    "url": "assets/js/2.4f725a8f.js",
    "revision": "acd7880ff33a29f069ce7bac074d6b18"
  },
  {
    "url": "assets/js/3.df50b1a3.js",
    "revision": "eda5774bc40111250997e63c915ccb6d"
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
    "url": "assets/js/7.7a4f7676.js",
    "revision": "79982510be6c0c8b32ed909b7d640c92"
  },
  {
    "url": "assets/js/8.ebbd0b0d.js",
    "revision": "96afb52ee98d047aea5c3639ac10af70"
  },
  {
    "url": "assets/js/app.05623d48.js",
    "revision": "cf922221d07fd651645a0ffa507bbb88"
  },
  {
    "url": "index.html",
    "revision": "27b424f9d379ceaf75697e17d74aa7e5"
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
