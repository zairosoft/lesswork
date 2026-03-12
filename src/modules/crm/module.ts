import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmController } from './controllers/crm.controller';
import { CrmService } from './services/crm.service';
import { CrmContactEntity } from './entities/crm-contact.entity';
import { CrmContactRepository } from './repositories/crm-contact.repository';
import { CrmSeeder } from './seeders/crm.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([CrmContactEntity])],
  controllers: [CrmController],
  providers: [CrmService, CrmContactRepository, CrmSeeder],
  exports: [CrmService, CrmSeeder],
})
export class CrmModule {}

