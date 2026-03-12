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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const redis_constants_1 = require("../../../infrastructure/redis/redis.constants");
const crm_contact_repository_1 = require("../repositories/crm-contact.repository");
const crm_contact_view_1 = require("../views/crm-contact.view");
let CrmService = class CrmService {
    constructor(crmContactRepository, eventEmitter, cacheStore) {
        this.crmContactRepository = crmContactRepository;
        this.eventEmitter = eventEmitter;
        this.cacheStore = cacheStore;
    }
    async createContact(dto) {
        const contact = await this.crmContactRepository.create(dto);
        await this.cacheStore.del('crm:contacts:list');
        this.eventEmitter.emit('crm.contact.created', {
            contactId: contact.id,
            orgId: contact.orgId,
            email: contact.email,
        });
        return crm_contact_view_1.CrmContactViewMapper.toView(contact);
    }
    async getContacts(query) {
        const cacheKey = `crm:contacts:list:${JSON.stringify(query)}`;
        const cached = await this.cacheStore.get(cacheKey);
        if (cached) {
            return cached;
        }
        const [contacts, total] = await this.crmContactRepository.findAll(query);
        const response = {
            data: crm_contact_view_1.CrmContactViewMapper.toList(contacts),
            total,
            page: query.page ?? 1,
            limit: query.limit ?? 20,
        };
        await this.cacheStore.set(cacheKey, response, 60);
        return response;
    }
    async getContactById(id) {
        const contact = await this.crmContactRepository.findById(id);
        return crm_contact_view_1.CrmContactViewMapper.toView(contact);
    }
    async updateContact(id, dto) {
        const updated = await this.crmContactRepository.update(id, dto);
        await this.cacheStore.del('crm:contacts:list');
        return crm_contact_view_1.CrmContactViewMapper.toView(updated);
    }
    async removeContact(id) {
        await this.crmContactRepository.remove(id);
        await this.cacheStore.del('crm:contacts:list');
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(redis_constants_1.CACHE_STORE)),
    __metadata("design:paramtypes", [crm_contact_repository_1.CrmContactRepository,
        event_emitter_1.EventEmitter2, Object])
], CrmService);
//# sourceMappingURL=crm.service.js.map