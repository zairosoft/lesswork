"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const database_module_1 = require("./infrastructure/database/database.module");
const redis_module_1 = require("./infrastructure/redis/redis.module");
const tenant_context_middleware_1 = require("./common/tenant/tenant-context.middleware");
const tenant_module_1 = require("./common/tenant/tenant.module");
const module_1 = require("./modules/auth/module");
const module_2 = require("./modules/users/module");
const module_3 = require("./modules/org/module");
const module_4 = require("./modules/crm/module");
const module_5 = require("./modules/helpdesk/module");
const module_6 = require("./modules/permissions/module");
const module_7 = require("./modules/apps/module");
const module_8 = require("./modules/notifications/module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(tenant_context_middleware_1.TenantContextMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            tenant_module_1.TenantModule,
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule,
            module_1.AuthModule,
            module_2.UsersModule,
            module_3.OrgModule,
            module_4.CrmModule,
            module_5.HelpdeskModule,
            module_6.PermissionsModule,
            module_7.AppsModule,
            module_8.NotificationsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map