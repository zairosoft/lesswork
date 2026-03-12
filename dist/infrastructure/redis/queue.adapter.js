"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisQueueAdapter = exports.InMemoryQueueAdapter = void 0;
const bullmq_1 = require("bullmq");
class InMemoryQueueAdapter {
    constructor() {
        this.storage = new Map();
    }
    async enqueue(queueName, _jobName, payload) {
        const existing = this.storage.get(queueName) ?? [];
        existing.push(payload);
        this.storage.set(queueName, existing);
    }
}
exports.InMemoryQueueAdapter = InMemoryQueueAdapter;
class RedisQueueAdapter {
    constructor(connection) {
        this.connection = connection;
        this.queues = new Map();
    }
    async enqueue(queueName, jobName, payload) {
        let queue = this.queues.get(queueName);
        if (!queue) {
            queue = new bullmq_1.Queue(queueName, {
                connection: this.connection,
            });
            this.queues.set(queueName, queue);
        }
        await queue.add(jobName, payload);
    }
    async close() {
        await Promise.all(Array.from(this.queues.values()).map((queue) => queue.close()));
    }
}
exports.RedisQueueAdapter = RedisQueueAdapter;
//# sourceMappingURL=queue.adapter.js.map