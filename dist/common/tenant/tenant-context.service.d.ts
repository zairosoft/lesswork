export declare class TenantContextService {
    private readonly als;
    run(tenantId: string, callback: () => void): void;
    getTenantId(): string;
}
