export declare abstract class TenantScopedEntity {
    id: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
