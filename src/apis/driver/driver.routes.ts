import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/driver/auth/auth.module';

export const adminRoutes: RouteTree = {
  path: 'driver',
  children: [
    {
      path: 'auth',
      module: AuthModule,
    },
  ],
};
