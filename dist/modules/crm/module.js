"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crm_controller_1 = require("./controllers/crm.controller");
const crm_service_1 = require("./services/crm.service");
const crm_contact_entity_1 = require("./entities/crm-contact.entity");
const crm_contact_repository_1 = require("./repositories/crm-contact.repository");
const crm_seeder_1 = require("./seeders/crm.seeder");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([crm_contact_entity_1.CrmContactEntity])],
        controllers: [crm_controller_1.CrmController],
        providers: [crm_service_1.CrmService, crm_contact_repository_1.CrmContactRepository, crm_seeder_1.CrmSeeder],
        exports: [crm_service_1.CrmService, crm_seeder_1.CrmSeeder],
    })
], CrmModule);
//# sourceMappingURL=module.js.map