export interface QueueAdapter {
    enqueue(queueName: string, jobName: string, payload: unknown): Promise<void>;
    close?(): Promise<void>;
}
export type QueueConnection = {
    host: string;
    port: number;
    password?: string;
    db?: number;
};
export declare class InMemoryQueueAdapter implements QueueAdapter {
    private readonly storage;
    enqueue(queueName: string, _jobName: string, payload: unknown): Promise<void>;
}
export declare class RedisQueueAdapter implements QueueAdapter {
    private readonly connection;
    private readonly queues;
    constructor(connection: QueueConnection);
    enqueue(queueName: string, jobName: string, payload: unknown): Promise<void>;
    close(): Promise<void>;
}
