import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AdminAuthGuard } from '@src/common/guards/admin-auth.guard';
// routes
import { adminRoutes } from '@src/apis/admin/admin.routes';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';
import { DriverModule } from '@src/apis/admin/driver/driver.module';

@Module({
  imports: [RouterModule.register([adminRoutes]), AuthModule, DriverModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
  ],
})
export class AdminModule {}
