"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crm_contact_entity_1 = require("../entities/crm-contact.entity");
let CrmSeeder = class CrmSeeder {
    constructor(repository) {
        this.repository = repository;
    }
    async seed() {
        const tenantId = 'public';
        const existing = await this.repository.count({ where: { tenantId } });
        if (existing > 0) {
            return;
        }
        const seedContacts = this.repository.create([
            {
                tenantId,
                orgId: '00000000-0000-0000-0000-000000000001',
                fullName: 'Acme Procurement Team',
                email: 'procurement@acme.example',
                phone: '+1-555-1000',
                status: crm_contact_entity_1.ContactStatus.LEAD,
            },
            {
                tenantId,
                orgId: '00000000-0000-0000-0000-000000000001',
                fullName: 'Globex Support Director',
                email: 'support.director@globex.example',
                phone: '+1-555-1001',
                status: crm_contact_entity_1.ContactStatus.CUSTOMER,
            },
        ]);
        await this.repository.save(seedContacts);
    }
};
exports.CrmSeeder = CrmSeeder;
exports.CrmSeeder = CrmSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crm_contact_entity_1.CrmContactEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CrmSeeder);
//# sourceMappingURL=crm.seeder.js.map