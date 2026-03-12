import { ContactStatus } from '../entities/crm-contact.entity';
export declare class UpdateContactDto {
    orgId?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    status?: ContactStatus;
}
