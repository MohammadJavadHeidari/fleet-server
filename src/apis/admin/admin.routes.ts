import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';
import { DriverModule } from '@src/apis/admin/driver/driver.module';
import { StationModule } from './station/station.module';
import { RouteModule } from './route/route.module';
import { EmployeeModule } from './employee/employee.module';

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
    {
      path: 'station',
      module: StationModule,
    },
    {
      path: 'route',
      module: RouteModule,
    },
    {
      path: 'employee',
      module: EmployeeModule,
    },
  ],
};
