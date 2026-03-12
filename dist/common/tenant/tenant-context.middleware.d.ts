import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from './tenant-context.service';
export declare class TenantContextMiddleware implements NestMiddleware {
    private readonly tenantContext;
    constructor(tenantContext: TenantContextService);
    use(req: Request, _res: Response, next: NextFunction): void;
}
