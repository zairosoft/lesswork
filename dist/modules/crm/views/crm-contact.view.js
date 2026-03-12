"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmContactViewMapper = void 0;
class CrmContactViewMapper {
    static toView(entity) {
        return {
            id: entity.id,
            fullName: entity.fullName,
            email: entity.email,
            phone: entity.phone,
            status: entity.status,
            createdAt: entity.createdAt.toISOString(),
        };
    }
    static toList(entities) {
        return entities.map((entity) => this.toView(entity));
    }
}
exports.CrmContactViewMapper = CrmContactViewMapper;
//# sourceMappingURL=crm-contact.view.js.map