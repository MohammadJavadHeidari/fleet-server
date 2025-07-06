import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
// routes
import { adminRoutes } from '@src/apis/admin/admin.routes';
// modules
import { AuthModule } from '@src/apis/admin/auth/auth.module';
import { AdminAuthGuard } from '@src/common/guards/admin-auth.guard';
import { DriverModule } from './driver/driver.module';
import { StationModule } from './station/station.module';
import { RouteModule } from './route/route.module';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [RouterModule.register([adminRoutes]), AuthModule, DriverModule, StationModule, RouteModule, EmployeeModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
  ],
})
export class AdminModule {}
