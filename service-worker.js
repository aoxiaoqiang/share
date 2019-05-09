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
    "url": "assets/js/10.b7700f4c.js",
    "revision": "71072183eec37386cf473835b1b372d5"
  },
  {
    "url": "assets/js/11.9cbe315a.js",
    "revision": "93cb490a0bb664c97c98d8d52a7bffb5"
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
    "url": "assets/js/6.07aec94a.js",
    "revision": "262ed7fd2a9e06788e6889d335d1509f"
  },
  {
    "url": "assets/js/7.4a1e609b.js",
    "revision": "cb1845c30902e953a925c9160b6ddc5f"
  },
  {
    "url": "assets/js/8.99f02355.js",
    "revision": "0bb98090a69a69c823e68f7a4d344993"
  },
  {
    "url": "assets/js/9.15dd379d.js",
    "revision": "33d40c2423ae0faa02c542f85639c61c"
  },
  {
    "url": "assets/js/app.de68caca.js",
    "revision": "3355923bb76a496df5c2157b0afcbaa5"
  },
  {
    "url": "index.html",
    "revision": "cabe5a6063f669145015490601dfec6a"
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
