import { Module } from '@nestjs/common';
// Modules
import { AdminModule } from '@src/apis/admin/admin.module';
import { DriverModule } from '@src/apis/driver/driver.module';
import { EmployeeModule } from '@src/apis/employee/employee.module';

@Module({
  imports: [AdminModule, DriverModule, EmployeeModule],
})
export class ApiModules {}
