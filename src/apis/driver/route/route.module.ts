import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchemaClass, RouteSchema } from '@src/apis/admin/route/entities/route.schema';
import { StationSchemaClass, StationSchema } from '@src/apis/admin/station/entities/station.schema';
import { DriverSchemaClass, DriverSchema } from '@src/apis/admin/driver/entities/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StationSchemaClass.name, schema: StationSchema },
      { name: DriverSchemaClass.name, schema: DriverSchema },
      { name: RouteSchemaClass.name, schema: RouteSchema },
    ]),
  ],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
