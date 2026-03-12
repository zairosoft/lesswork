import Redis from 'ioredis';
export interface SessionStore {
    get<T>(sessionId: string): Promise<T | null>;
    set<T>(sessionId: string, payload: T, ttlSeconds?: number): Promise<void>;
    destroy(sessionId: string): Promise<void>;
}
export declare class InMemorySessionStore implements SessionStore {
    private readonly sessions;
    get<T>(sessionId: string): Promise<T | null>;
    set<T>(sessionId: string, payload: T, ttlSeconds?: number): Promise<void>;
    destroy(sessionId: string): Promise<void>;
}
export declare class RedisSessionStore implements SessionStore {
    private readonly redis;
    constructor(redis: Redis);
    get<T>(sessionId: string): Promise<T | null>;
    set<T>(sessionId: string, payload: T, ttlSeconds?: number): Promise<void>;
    destroy(sessionId: string): Promise<void>;
}
