import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';
import { DriverModule } from '@src/apis/admin/driver/driver.module';

export const adminRoutes: RouteTree = {
  path: 'admin',
  children: [
    {
      path: 'auth',
      module: AuthModule,
    },
    {
      path: 'driver',
      module: DriverModule,
    },
  ],
};
