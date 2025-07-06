import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchemaClass, RouteSchema } from './entities/route.schema';
import { StationSchema, StationSchemaClass } from '../station/entities/station.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StationSchemaClass.name, schema: StationSchema },
      { name: RouteSchemaClass.name, schema: RouteSchema },
    ]),
  ],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
