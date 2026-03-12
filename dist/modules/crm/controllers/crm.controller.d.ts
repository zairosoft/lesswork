import { CreateContactDto } from '../dto/create-contact.dto';
import { ListContactsDto } from '../dto/list-contacts.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CrmService } from '../services/crm.service';
export declare class CrmController {
    private readonly crmService;
    constructor(crmService: CrmService);
    create(dto: CreateContactDto): Promise<import("../views/crm-contact.view").CrmContactView>;
    findAll(query: ListContactsDto): Promise<{
        data: ReturnType<typeof import("../views/crm-contact.view").CrmContactViewMapper.toList>;
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("../views/crm-contact.view").CrmContactView>;
    update(id: string, dto: UpdateContactDto): Promise<import("../views/crm-contact.view").CrmContactView>;
    remove(id: string): Promise<void>;
}
