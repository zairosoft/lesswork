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
exports.CrmContactRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tenant_context_service_1 = require("../../../common/tenant/tenant-context.service");
const crm_contact_entity_1 = require("../entities/crm-contact.entity");
let CrmContactRepository = class CrmContactRepository {
    constructor(repository, tenantContext) {
        this.repository = repository;
        this.tenantContext = tenantContext;
    }
    async create(dto) {
        const entity = this.repository.create({
            ...dto,
            status: dto.status ?? undefined,
            tenantId: this.tenantContext.getTenantId(),
        });
        return this.repository.save(entity);
    }
    async findAll(query) {
        const tenantId = this.tenantContext.getTenantId();
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const where = query.search
            ? [
                { tenantId, fullName: (0, typeorm_2.ILike)(`%${query.search}%`) },
                { tenantId, email: (0, typeorm_2.ILike)(`%${query.search}%`) },
            ]
            : { tenantId };
        return this.repository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findById(id) {
        const tenantId = this.tenantContext.getTenantId();
        const found = await this.repository.findOne({
            where: { id, tenantId },
        });
        if (!found) {
            throw new common_1.NotFoundException('CRM contact not found');
        }
        return found;
    }
    async update(id, dto) {
        const found = await this.findById(id);
        Object.assign(found, dto);
        return this.repository.save(found);
    }
    async remove(id) {
        const tenantId = this.tenantContext.getTenantId();
        const result = await this.repository.softDelete({ id, tenantId });
        if (!result.affected) {
            throw new common_1.NotFoundException('CRM contact not found');
        }
    }
};
exports.CrmContactRepository = CrmContactRepository;
exports.CrmContactRepository = CrmContactRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crm_contact_entity_1.CrmContactEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tenant_context_service_1.TenantContextService])
], CrmContactRepository);
//# sourceMappingURL=crm-contact.repository.js.map