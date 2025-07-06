import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchemaClass, RouteSchema } from './entities/route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RouteSchemaClass.name, schema: RouteSchema }]),
  ],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
