import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
// routes
import { adminRoutes } from '@src/apis/admin/admin.routes';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';
import { AdminAuthGuard } from '@src/common/guards/admin-auth.guard';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [RouterModule.register([adminRoutes]), AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
  ],
})
export class AdminModule {}
