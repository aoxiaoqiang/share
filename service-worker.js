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
    "url": "assets/js/10.359a2731.js",
    "revision": "43616ff1cfba1554623e716fdb1909b5"
  },
  {
    "url": "assets/js/11.4c0544eb.js",
    "revision": "cd3b96234e389895dd55ea019eb0d791"
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
    "url": "assets/js/4.bb2dab2e.js",
    "revision": "dd3ed8b2a3783530d55196d8f67b13c2"
  },
  {
    "url": "assets/js/5.afc21057.js",
    "revision": "32b6ad7a350c27f67a1e93479ee65fec"
  },
  {
    "url": "assets/js/6.52513f5c.js",
    "revision": "da09c40cc9e028a45ebba4be735dc725"
  },
  {
    "url": "assets/js/7.ee1bef6f.js",
    "revision": "65bcc131d82ab794c9848fef290bb95c"
  },
  {
    "url": "assets/js/8.7641f61e.js",
    "revision": "fc343fd2e16e1d7321aa14d1bafc1a14"
  },
  {
    "url": "assets/js/9.bc88c158.js",
    "revision": "124ee5bd5b0016892436cdf300ca43d4"
  },
  {
    "url": "assets/js/app.dbfd8b29.js",
    "revision": "b2ca8c110dc93875aaa126eb46459735"
  },
  {
    "url": "index.html",
    "revision": "39c39ac9b128c34d86bc49199fd7256a"
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
