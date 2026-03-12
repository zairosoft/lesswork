"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionStore = exports.InMemorySessionStore = void 0;
class InMemorySessionStore {
    constructor() {
        this.sessions = new Map();
    }
    async get(sessionId) {
        const found = this.sessions.get(sessionId);
        if (!found) {
            return null;
        }
        if (found.expiresAt && found.expiresAt < Date.now()) {
            this.sessions.delete(sessionId);
            return null;
        }
        return JSON.parse(found.payload);
    }
    async set(sessionId, payload, ttlSeconds = 3600) {
        this.sessions.set(sessionId, {
            payload: JSON.stringify(payload),
            expiresAt: Date.now() + ttlSeconds * 1000,
        });
    }
    async destroy(sessionId) {
        this.sessions.delete(sessionId);
    }
}
exports.InMemorySessionStore = InMemorySessionStore;
class RedisSessionStore {
    constructor(redis) {
        this.redis = redis;
    }
    async get(sessionId) {
        const raw = await this.redis.get(`session:${sessionId}`);
        return raw ? JSON.parse(raw) : null;
    }
    async set(sessionId, payload, ttlSeconds = 3600) {
        await this.redis.set(`session:${sessionId}`, JSON.stringify(payload), 'EX', ttlSeconds);
    }
    async destroy(sessionId) {
        await this.redis.del(`session:${sessionId}`);
    }
}
exports.RedisSessionStore = RedisSessionStore;
//# sourceMappingURL=session.store.js.map