import { Repository } from 'typeorm';
import { TenantContextService } from '../../../common/tenant/tenant-context.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ListContactsDto } from '../dto/list-contacts.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CrmContactEntity } from '../entities/crm-contact.entity';
export declare class CrmContactRepository {
    private readonly repository;
    private readonly tenantContext;
    constructor(repository: Repository<CrmContactEntity>, tenantContext: TenantContextService);
    create(dto: CreateContactDto): Promise<CrmContactEntity>;
    findAll(query: ListContactsDto): Promise<[CrmContactEntity[], number]>;
    findById(id: string): Promise<CrmContactEntity>;
    update(id: string, dto: UpdateContactDto): Promise<CrmContactEntity>;
    remove(id: string): Promise<void>;
}
