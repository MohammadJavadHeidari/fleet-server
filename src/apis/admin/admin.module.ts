import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
// routes
import { adminRoutes } from '@src/apis/admin/admin.routes';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';

@Module({
  imports: [
    RouterModule.register([adminRoutes]),
    AuthModule
  ]
})
export class AdminModule {}
