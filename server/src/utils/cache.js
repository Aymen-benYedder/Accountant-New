/**
 * Hybrid in-process LRU cache + distributed Redis cache utility.
 * Usage: call cacheResult(routeKey, ttlSeconds)(req, res, next) as an Express middleware.
 */
//const LRU = require('lru-cache');
const { LRUCache } = require('lru-cache');
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');

// 1. In-process LRU Microcache (quick-start, 1k items, 15s TTL typical for config/stable endpoints)
const memoryCache = new LRUCache({ max: 1000, ttl: 15000 });

// 2. Distributed Redis Cache (clustered for all servers)
// const redisCache = cacheManager.caching({
//   store: redisStore,
//   host: process.env.REDIS_HOST || 'localhost',
//   port: process.env.REDIS_PORT || 6379,
//   ttl: 60 * 5 // 5 minutes default
// });
let redisCache;
try {
  redisCache = cacheManager.caching({
    store: redisStore,
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    ttl: 60 * 5
  });

  // Safely attach error listener to prevent unhandled error crash
  const redisClient = redisCache.store.getClient?.();
  if (redisClient && typeof redisClient.on === 'function') {
    redisClient.on('error', (err) => {
      console.warn('[Redis] Connection error. Falling back to memory cache. Reason:', err.message);
      // Optionally switch to no-op redisCache here too
    });
  }
} catch (err) {
  console.warn('Redis initialization failed. Falling back to memory-only caching.', err.message);
  redisCache = {
    get: async () => undefined,
    set: async () => {},
    del: async () => {},
    store: { keys: async () => [], del: async () => {} }
  };
}


// Combined “get or set” utility
async function getCache(key) {
  let value = memoryCache.get(key);
  if (value !== undefined) return value;

  value = await redisCache.get(key);
  if (value !== undefined) {
    memoryCache.set(key, value); // fill CPU cache
    return value;
  }
  return undefined;
}

async function setCache(key, value, ttlSec = 60) {
  memoryCache.set(key, value, { ttl: ttlSec * 1000 });
  await redisCache.set(key, value, { ttl: ttlSec });
}

// Cache invalidation utility
async function delCache(matchKeyOrRegex) {
  // In-process memory LRU
  if (typeof matchKeyOrRegex === 'string') {
    memoryCache.delete(matchKeyOrRegex);
    await redisCache.del(matchKeyOrRegex);
  } else if (matchKeyOrRegex instanceof RegExp) {
    // Delete all keys that match regex from both caches
    memoryCache.forEach((_value, key) => {
      if (matchKeyOrRegex.test(key)) memoryCache.delete(key);
    });
    // For Redis: scan is not implemented, so best effort only unless you use redis native client
    // Here, with cache-manager, we try to call keys and multi-del if supported
    if (typeof redisCache.store.keys === 'function') {
      const keys = await redisCache.store.keys('*');
      const batch = keys.filter(k => matchKeyOrRegex.test(k));
      if (batch.length) await redisCache.store.del(batch);
    }
  }
}

// Express middleware for GET routes: cache response if 200
function cacheResult(keyPrefix, ttlSec = 30) {
  return async (req, res, next) => {
    const key = `${keyPrefix}:${req.originalUrl}`;
    // Try caches
    const cached = await getCache(key);
    if (cached) {
      res.set('X-Cache', 'HIT');
      res.set('Cache-Control', `public, max-age=${ttlSec}`);
      return res.json(cached);
    }
    // Hijack res.json to populate cache
    const origJson = res.json.bind(res);
    res.json = async (body) => {
      await setCache(key, body, ttlSec);
      res.set('X-Cache', 'MISS');
      res.set('Cache-Control', `public, max-age=${ttlSec}`);
      origJson(body);
    };
    next();
  };
}

module.exports = {
  memoryCache,
  redisCache,
  getCache,
  setCache,
  delCache,
  cacheResult
};