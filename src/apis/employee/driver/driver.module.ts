import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, EmployeeSchemaClass } from '@src/apis/admin/employee/entities/employee.schema';
// entities
import { DriverSchemaClass, DriverSchema } from '@src/apis/admin/driver/entities/driver.schema';
import { DriverLocationSchemaClass, DriverLocationSchema } from '@src/apis/driver/location/entities/driver-location.schema';
import { StationSchemaClass, StationSchema } from '@src/apis/admin/station/entities/station.schema';
import { RouteSchemaClass, RouteSchema } from '@src/apis/admin/route/entities/route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmployeeSchemaClass.name, schema: EmployeeSchema },
      { name: DriverSchemaClass.name, schema: DriverSchema },
      { name: StationSchemaClass.name, schema: StationSchema },
      { name: RouteSchemaClass.name, schema: RouteSchema },
      { name: DriverLocationSchemaClass.name, schema: DriverLocationSchema },
    ]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
