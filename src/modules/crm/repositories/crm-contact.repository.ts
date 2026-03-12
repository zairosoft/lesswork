import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { TenantContextService } from '../../../common/tenant/tenant-context.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ListContactsDto } from '../dto/list-contacts.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CrmContactEntity } from '../entities/crm-contact.entity';

@Injectable()
export class CrmContactRepository {
  constructor(
    @InjectRepository(CrmContactEntity)
    private readonly repository: Repository<CrmContactEntity>,
    private readonly tenantContext: TenantContextService,
  ) {}

  async create(dto: CreateContactDto): Promise<CrmContactEntity> {
    const entity = this.repository.create({
      ...dto,
      status: dto.status ?? undefined,
      tenantId: this.tenantContext.getTenantId(),
    });

    return this.repository.save(entity);
  }

  async findAll(query: ListContactsDto): Promise<[CrmContactEntity[], number]> {
    const tenantId = this.tenantContext.getTenantId();
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where = query.search
      ? [
          { tenantId, fullName: ILike(`%${query.search}%`) },
          { tenantId, email: ILike(`%${query.search}%`) },
        ]
      : { tenantId };

    return this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: string): Promise<CrmContactEntity> {
    const tenantId = this.tenantContext.getTenantId();
    const found = await this.repository.findOne({
      where: { id, tenantId },
    });

    if (!found) {
      throw new NotFoundException('CRM contact not found');
    }

    return found;
  }

  async update(id: string, dto: UpdateContactDto): Promise<CrmContactEntity> {
    const found = await this.findById(id);
    Object.assign(found, dto);
    return this.repository.save(found);
  }

  async remove(id: string): Promise<void> {
    const tenantId = this.tenantContext.getTenantId();
    const result = await this.repository.softDelete({ id, tenantId });
    if (!result.affected) {
      throw new NotFoundException('CRM contact not found');
    }
  }
}

