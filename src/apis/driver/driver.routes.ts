import { RouteTree } from '@nestjs/core';
// modules
import { AuthModule } from '@src/apis/driver/auth/auth.module';
import { LocationModule } from '@src/apis/driver/location/location.module';
import { RouteModule } from '@src/apis/driver/route/route.module';

export const driverRoutes: RouteTree = {
  path: 'driver',
  children: [
    {
      path: 'auth',
      module: AuthModule,
    },
    {
      path: 'location',
      module: LocationModule,
    },
    {
      path: 'route',
      module: RouteModule,
    },
  ],
};
