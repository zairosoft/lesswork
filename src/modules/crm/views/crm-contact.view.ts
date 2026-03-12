import { CrmContactEntity } from '../entities/crm-contact.entity';

export type CrmContactView = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  status: string;
  createdAt: string;
};

export class CrmContactViewMapper {
  static toView(entity: CrmContactEntity): CrmContactView {
    return {
      id: entity.id,
      fullName: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  static toList(entities: CrmContactEntity[]): CrmContactView[] {
    return entities.map((entity) => this.toView(entity));
  }
}

