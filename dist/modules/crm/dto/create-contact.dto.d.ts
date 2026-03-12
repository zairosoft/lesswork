import { ContactStatus } from '../entities/crm-contact.entity';
export declare class CreateContactDto {
    orgId: string;
    fullName: string;
    email: string;
    phone?: string;
    status?: ContactStatus;
}
