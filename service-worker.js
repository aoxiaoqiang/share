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
    "url": "assets/js/10.2655e777.js",
    "revision": "3ace66a4d5b41b478750203f87a7b235"
  },
  {
    "url": "assets/js/11.1b5b21ec.js",
    "revision": "9f125bc12e4167c02fc7e339d781f3b4"
  },
  {
    "url": "assets/js/12.4cfc540f.js",
    "revision": "c6af484d2eaa6e3b393f049d0680604f"
  },
  {
    "url": "assets/js/13.027d3509.js",
    "revision": "3c82a1439e58c15aaf5f969127d41aaf"
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
    "url": "assets/js/4.7674a282.js",
    "revision": "1fbc82a6377f950f1f7611293c2302ba"
  },
  {
    "url": "assets/js/5.6b4b3fc2.js",
    "revision": "3b2f5e2bd90972009b922a7d62230ae0"
  },
  {
    "url": "assets/js/6.eae75b47.js",
    "revision": "f421197648dee7866b7a592fc294b018"
  },
  {
    "url": "assets/js/7.4062c9e3.js",
    "revision": "3e10ff3abd21657c16ecc03d4905fa16"
  },
  {
    "url": "assets/js/8.7eac1576.js",
    "revision": "c6223cc65154f4fbc7ed88132497bc5c"
  },
  {
    "url": "assets/js/9.abdaf9be.js",
    "revision": "866fe6aaec25be3a3b1c4ed044d9c178"
  },
  {
    "url": "assets/js/app.35e8eb11.js",
    "revision": "5d2725a7b97bfd58a79448c2709c5e48"
  },
  {
    "url": "index.html",
    "revision": "6af3e2205d9b065d76c3d92a77ec9ddc"
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
