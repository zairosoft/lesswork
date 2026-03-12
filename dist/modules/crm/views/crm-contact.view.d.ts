import { CrmContactEntity } from '../entities/crm-contact.entity';
export type CrmContactView = {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    status: string;
    createdAt: string;
};
export declare class CrmContactViewMapper {
    static toView(entity: CrmContactEntity): CrmContactView;
    static toList(entities: CrmContactEntity[]): CrmContactView[];
}
