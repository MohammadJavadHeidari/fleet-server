import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchemaClass, EmployeeSchema } from './entities/employee.schema';
import { StationSchema, StationSchemaClass } from '../station/entities/station.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmployeeSchemaClass.name, schema: EmployeeSchema },
      { name: StationSchemaClass.name, schema: StationSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
