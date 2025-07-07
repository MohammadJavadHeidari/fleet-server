import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/employee/auth/auth.module';
import { DriverModule } from './driver/driver.module';

export const employeeRoutes: RouteTree = {
  path: 'employee',
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
