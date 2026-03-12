import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CrmSeeder } from '../../modules/crm/seeders/crm.seeder';
import { ModuleSeeder } from '../../common/interfaces/module-seeder.interface';

async function runSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeders: ModuleSeeder[] = [app.get(CrmSeeder)];

  for (const seeder of seeders) {
    await seeder.seed();
  }

  await app.close();
}

runSeeders()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seeders completed');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Seeder failed', error);
    process.exit(1);
  });

