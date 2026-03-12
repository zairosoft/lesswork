import { EventEmitter2 } from '@nestjs/event-emitter';
import { CacheStore } from '../../../infrastructure/redis/cache.store';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ListContactsDto } from '../dto/list-contacts.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CrmContactRepository } from '../repositories/crm-contact.repository';
import { CrmContactViewMapper } from '../views/crm-contact.view';
export declare class CrmService {
    private readonly crmContactRepository;
    private readonly eventEmitter;
    private readonly cacheStore;
    constructor(crmContactRepository: CrmContactRepository, eventEmitter: EventEmitter2, cacheStore: CacheStore);
    createContact(dto: CreateContactDto): Promise<import("../views/crm-contact.view").CrmContactView>;
    getContacts(query: ListContactsDto): Promise<{
        data: ReturnType<typeof CrmContactViewMapper.toList>;
        total: number;
        page: number;
        limit: number;
    }>;
    getContactById(id: string): Promise<import("../views/crm-contact.view").CrmContactView>;
    updateContact(id: string, dto: UpdateContactDto): Promise<import("../views/crm-contact.view").CrmContactView>;
    removeContact(id: string): Promise<void>;
}
