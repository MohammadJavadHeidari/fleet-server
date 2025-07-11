import { Module } from '@nestjs/common';
// Guards
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { EmployeeAuthGuard } from '@src/common/guards/employee-auth.guard';
// routes
import { employeeRoutes } from '@src/apis/employee/employee.routes';
// modules
import { AuthModule } from '@src/apis/employee/auth/auth.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [RouterModule.register([employeeRoutes]), AuthModule, DriverModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: EmployeeAuthGuard,
    },
  ],
})
export class EmployeeModule {}
