import { OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { QueueAdapter } from './queue.adapter';
export declare class RedisModule implements OnModuleDestroy {
    private readonly redisClient;
    private readonly queueAdapter;
    constructor(redisClient: Redis | null, queueAdapter: QueueAdapter);
    onModuleDestroy(): Promise<void>;
}
