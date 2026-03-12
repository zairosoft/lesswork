"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheStore = exports.InMemoryCacheStore = void 0;
class InMemoryCacheStore {
    constructor() {
        this.data = new Map();
    }
    async get(key) {
        const entry = this.data.get(key);
        if (!entry) {
            return null;
        }
        if (entry.expiresAt && entry.expiresAt < Date.now()) {
            this.data.delete(key);
            return null;
        }
        return JSON.parse(entry.value);
    }
    async set(key, value, ttlSeconds) {
        const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
        this.data.set(key, {
            value: JSON.stringify(value),
            expiresAt,
        });
    }
    async del(key) {
        this.data.delete(key);
    }
}
exports.InMemoryCacheStore = InMemoryCacheStore;
class RedisCacheStore {
    constructor(redis) {
        this.redis = redis;
    }
    async get(key) {
        const raw = await this.redis.get(key);
        return raw ? JSON.parse(raw) : null;
    }
    async set(key, value, ttlSeconds = 60) {
        await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    }
    async del(key) {
        await this.redis.del(key);
    }
}
exports.RedisCacheStore = RedisCacheStore;
//# sourceMappingURL=cache.store.js.map