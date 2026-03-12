import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare function createTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions;
