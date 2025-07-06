import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StationSchemaClass, StationSchema } from './entities/station.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StationSchemaClass.name, schema: StationSchema }]),
  ],
  controllers: [StationController],
  providers: [StationService],
  exports: [StationService],
})
export class StationModule {}
