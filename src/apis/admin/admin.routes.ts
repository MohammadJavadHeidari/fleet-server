import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';


export const adminRoutes: RouteTree = {
  path: 'admin',
  children: [
    {
      path: 'auth',
      module: AuthModule,
    },
  ],
};
