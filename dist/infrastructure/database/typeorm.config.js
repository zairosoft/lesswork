"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmConfig = createTypeOrmConfig;
function createTypeOrmConfig(configService) {
    return {
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_NAME', 'zairosoft'),
        autoLoadEntities: true,
        synchronize: configService.get('DB_SYNC', 'false') === 'true',
        logging: configService.get('NODE_ENV', 'development') !== 'production',
    };
}
//# sourceMappingURL=typeorm.config.js.map