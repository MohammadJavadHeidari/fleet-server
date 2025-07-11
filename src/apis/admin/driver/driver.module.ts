import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchemaClass, DriverSchema } from './entities/driver.schema';
import { RouteSchema, RouteSchemaClass } from '../route/entities/route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RouteSchemaClass.name, schema: RouteSchema },
      { name: DriverSchemaClass.name, schema: DriverSchema },
    ]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
