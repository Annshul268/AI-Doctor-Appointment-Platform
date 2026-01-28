// AI HealthCare Service Worker
// Provides offline AI capabilities and smart caching

const CACHE_NAME = 'ai-healthcare-v1.2.0';
const OFFLINE_URL = '/offline.html';

// Critical resources to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/symptom-checker',
  '/emergency',
  '/dashboard',
  '/find-doctor'
];

// AI model and data cache
const AI_CACHE_URLS = [
  '/ai-models/symptom-classifier.json',
  '/ai-models/medical-knowledge-base.json',
  '/ai-models/emergency-protocols.json'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🤖 AI HealthCare SW: Installing...');
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Cache critical app shell
      await cache.addAll(STATIC_CACHE_URLS);
      
      // Cache AI models for offline functionality
      try {
        await cache.addAll(AI_CACHE_URLS);
        console.log('🧠 AI models cached for offline use');
      } catch (e) {
        console.warn('⚠️ Some AI models failed to cache:', e);
      }
      
      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 AI HealthCare SW: Activating...');
  
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
      
      // Take control of all clients
      self.clients.claim();
      
      console.log('✅ AI HealthCare SW: Activated and ready for offline AI');
    })()
  );
});

// Fetch event - implement offline AI strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method !== 'GET') return;
  
  // Emergency mode - always try network first, fallback to cache
  if (url.pathname === '/emergency') {
    event.respondWith(handleEmergencyRequest(request));
    return;
  }
  
  // AI symptom checking - enable offline mode
  if (url.pathname === '/symptom-checker' || url.pathname.includes('/api/ai/')) {
    event.respondWith(handleAIRequest(request));
    return;
  }
  
  // Static resources - cache first
  if (STATIC_CACHE_URLS.includes(url.pathname)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }
  
  // Default strategy - network first, cache fallback
  event.respondWith(handleDefaultRequest(request));
});

// Emergency request handler - prioritize network for real-time data
async function handleEmergencyRequest(request) {
  try {
    // Always try network first for emergency
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful emergency page responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📱 Emergency offline mode activated');
    
    // Fallback to cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline emergency page
    return caches.match('/emergency') || caches.match(OFFLINE_URL);
  }
}

// AI request handler - enable offline AI functionality
async function handleAIRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first for latest AI models
    const networkResponse = await fetch(request, { timeout: 3000 });
    
    if (networkResponse.ok) {
      // Cache AI responses for offline use
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('🧠 AI offline mode activated');
  }
  
  // Fallback to cached AI responses
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return offline AI response
  if (url.pathname.includes('/api/ai/symptom-check')) {
    return new Response(JSON.stringify({
      offline: true,
      message: "Basic AI symptom checking available offline",
      suggestions: [
        "Monitor symptoms and seek care if they worsen",
        "Stay hydrated and rest",
        "Contact healthcare provider when back online"
      ],
      urgency: "routine",
      disclaimer: "This is a basic offline assessment. Seek professional medical advice."
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Default offline AI page
  return caches.match('/symptom-checker') || caches.match(OFFLINE_URL);
}

// Static request handler - cache first strategy
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cached version immediately
    fetchAndUpdateCache(request); // Update in background
    return cachedResponse;
  }
  
  // If not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return caches.match(OFFLINE_URL);
  }
}

// Default request handler - network first with cache fallback
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return cached version if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    // Return network error for other requests
    throw error;
  }
}

// Background cache update
async function fetchAndUpdateCache(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-health-data') {
    event.waitUntil(syncHealthData());
  }
});

// Sync health data when back online
async function syncHealthData() {
  try {
    const offlineData = await getOfflineHealthData();
    
    if (offlineData.length > 0) {
      const response = await fetch('/api/sync-health-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offlineData)
      });
      
      if (response.ok) {
        await clearOfflineHealthData();
        console.log('✅ Health data synced successfully');
      }
    }
  } catch (error) {
    console.log('❌ Health data sync failed:', error);
  }
}

// Helper functions for offline data management
async function getOfflineHealthData() {
  // Return stored offline health data
  return [];
}

async function clearOfflineHealthData() {
  // Clear synced offline data
  return true;
}

// Push notifications for health alerts
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Health update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AI HealthCare', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

console.log('🏥 AI HealthCare Service Worker loaded - Offline AI Ready!');
