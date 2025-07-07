import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/employee/auth/auth.module';

export const employeeRoutes: RouteTree = {
  path: 'employee',
  children: [
    {
      path: 'auth',
      module: AuthModule,
    },
  ],
};
