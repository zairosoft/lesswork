import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { TenantContextMiddleware } from './common/tenant/tenant-context.middleware';
import { TenantModule } from './common/tenant/tenant.module';
import { AuthModule } from './modules/auth/module';
import { UsersModule } from './modules/users/module';
import { OrgModule } from './modules/org/module';
import { CrmModule } from './modules/crm/module';
import { HelpdeskModule } from './modules/helpdesk/module';
import { PermissionsModule } from './modules/permissions/module';
import { AppsModule } from './modules/apps/module';
import { NotificationsModule } from './modules/notifications/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    EventEmitterModule.forRoot(),
    TenantModule,
    DatabaseModule,
    RedisModule,
    AuthModule,
    UsersModule,
    OrgModule,
    CrmModule,
    HelpdeskModule,
    PermissionsModule,
    AppsModule,
    NotificationsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

