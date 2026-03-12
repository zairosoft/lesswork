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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmContactEntity = exports.ContactStatus = void 0;
const typeorm_1 = require("typeorm");
const tenant_scoped_entity_1 = require("../../../common/database/tenant-scoped.entity");
var ContactStatus;
(function (ContactStatus) {
    ContactStatus["LEAD"] = "lead";
    ContactStatus["CUSTOMER"] = "customer";
})(ContactStatus || (exports.ContactStatus = ContactStatus = {}));
let CrmContactEntity = class CrmContactEntity extends tenant_scoped_entity_1.TenantScopedEntity {
};
exports.CrmContactEntity = CrmContactEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], CrmContactEntity.prototype, "orgId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], CrmContactEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 160 }),
    __metadata("design:type", String)
], CrmContactEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], CrmContactEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContactStatus,
        default: ContactStatus.LEAD,
    }),
    __metadata("design:type", String)
], CrmContactEntity.prototype, "status", void 0);
exports.CrmContactEntity = CrmContactEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'crm_contacts' }),
    (0, typeorm_1.Index)(['tenantId', 'email'], { unique: true })
], CrmContactEntity);
//# sourceMappingURL=crm-contact.entity.js.map