"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const crm_seeder_1 = require("../../modules/crm/seeders/crm.seeder");
async function runSeeders() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeders = [app.get(crm_seeder_1.CrmSeeder)];
    for (const seeder of seeders) {
        await seeder.seed();
    }
    await app.close();
}
runSeeders()
    .then(() => {
    console.log('Seeders completed');
})
    .catch((error) => {
    console.error('Seeder failed', error);
    process.exit(1);
});
//# sourceMappingURL=seeder.runner.js.map