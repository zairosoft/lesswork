import { Repository } from 'typeorm';
import { ModuleSeeder } from '../../../common/interfaces/module-seeder.interface';
import { CrmContactEntity } from '../entities/crm-contact.entity';
export declare class CrmSeeder implements ModuleSeeder {
    private readonly repository;
    constructor(repository: Repository<CrmContactEntity>);
    seed(): Promise<void>;
}
