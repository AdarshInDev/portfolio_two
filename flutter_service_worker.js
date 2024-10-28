'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1a6b160a13332eedbc2f48e3bf9f6128",
"assets/AssetManifest.bin.json": "216c3556956d313b3e8918fe7ae3da60",
"assets/AssetManifest.json": "8bcfa93b7601e453b587bed26a75a7f8",
"assets/assets/images/dribbble.png": "05e7a319917c27cf287c5b72892512a7",
"assets/assets/images/facebook.png": "c5af45052937534eb0ab20536b2c6398",
"assets/assets/images/instagram.png": "7518e42262b10e0dc4eb2c75b3308c56",
"assets/assets/images/linkedin.png": "f962772430ade8a332f28cd4d3e01860",
"assets/assets/images/person.png": "37874bcfc1c361852827e2b643b6651d",
"assets/assets/images/person_mobile.png": "537d34a8927879fc99f2e8be80150b0e",
"assets/assets/images/twitter.png": "acf579635a946a113d97d0486ba65618",
"assets/assets/images/youtube.png": "57134324dc0f460485946c049d38b69e",
"assets/assets/services/3dot.png": "4d727bb01be3e2c9609c266693057fae",
"assets/assets/services/cross.png": "4bf5e002490b2860287b1055615678e3",
"assets/assets/services/date.png": "025a3d073c22408d87c785e9eaeea02d",
"assets/assets/services/game.png": "83bd98a0dcf4f792f08f2247a20a794d",
"assets/assets/services/logo1.png": "ca3455b468312453d6c15d091cc12422",
"assets/assets/services/map.png": "099a64eba9372294d5705f773f7f760b",
"assets/assets/services/mic.png": "80baac316638bd2d3ef2ff73ef3c9878",
"assets/assets/services/p1.png": "92f34bd425a550a0a93a1c6f28823990",
"assets/assets/services/p2.png": "a73cbbb14e28453da9a80b0520c1f62d",
"assets/assets/services/p3.png": "e247dcc21cac5528b10b54f69b90eb86",
"assets/assets/services/photo.png": "a76e990e612d025d45ffc835243ec0eb",
"assets/assets/services/rating.png": "92cc23713095286b798cb76fd589449f",
"assets/assets/services/social.png": "1fc5c2255bde359d14644a77c3559830",
"assets/assets/services/svgviewer-png-output%2520(1).png": "e12e836b6707450fd5e06ab283b9bd8a",
"assets/assets/services/svgviewer-png-output%2520(2).png": "4a7dbbf13ff7248af91fc2d5f51ec27f",
"assets/assets/services/svgviewer-png-output.png": "fa19edfc14b3a3308ac9c40245aa5ad0",
"assets/assets/services/tick.png": "4c04c66ced0604099f40d7fcb133b098",
"assets/assets/services/uiux.png": "9f19f88fbdda3dd4a08076de0f712cef",
"assets/assets/services/webdev.png": "76ba0d62d2296af4e3727c9a8bf108dc",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "fc255c568013a39273ba7044408660e9",
"assets/NOTICES": "b6da2c8f65daf6e5ba976c73dea6b64c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "51256174c3a7bf0cd769e4c978ba69e2",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "eeedbaeaabca03acb411697690a5bd1f",
"/": "eeedbaeaabca03acb411697690a5bd1f",
"main.dart.js": "957bf4c491d71d2aede4fee53cb7dd86",
"manifest.json": "444dc7a66eb9148415d66ede7db3f9ef",
"version.json": "34b30057bb574a86c8d3d4df290818a3"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
