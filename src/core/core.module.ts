import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// Modules
import { ClsModule } from '@src/common/cls/cls.module';
import { AppConfigModule } from '@src/config/config.module';
import { AppCacheModule } from '@src/config/cache/cache.module';
import { DatabaseModule } from '@src/core/database/database.module';
// import { GuardsModule } from '@src/core/guards/guards.module';
// import { HttpExceptionModule } from '@src/common/exceptions/http/http-exception.module';
// // Guards
// import { AuthGuard } from '@src/common/guards/auth.guard';
// import { RolesGuard } from '@src/common/guards/roles.guard';
// // Interceptors
// import { ResponseModule } from '@src/common/interceptors/response/response.module';
// import { AuditLoggingModule } from '@src/common/interceptors/audit-logging/audit-logging.module';
// import { AuditLoggingInterceptor } from '@src/common/interceptors/audit-logging/audit-logging.Interceptor';
// import { ResponseInterceptor } from '@src/common/interceptors/response/response.interceptor';

@Module({
    imports: [
        ClsModule,
        AppConfigModule,
        AppCacheModule,
        DatabaseModule,
        // GuardsModule,
        // HttpExceptionModule,
        // ResponseModule,
        // AuditLoggingModule,
    ],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: ResponseInterceptor,
        // },
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: AuditLoggingInterceptor,
        // },
    ],
    exports: [
        AppConfigModule,
    ]
})
export class CoreModule { }
