import { TenantScopedEntity } from '../../../common/database/tenant-scoped.entity';
export declare enum ContactStatus {
    LEAD = "lead",
    CUSTOMER = "customer"
}
export declare class CrmContactEntity extends TenantScopedEntity {
    orgId: string;
    fullName: string;
    email: string;
    phone?: string | null;
    status: ContactStatus;
}
