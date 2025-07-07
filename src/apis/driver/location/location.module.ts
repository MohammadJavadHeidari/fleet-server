import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverLocationSchema, DriverLocationSchemaClass } from './entities/driver-location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DriverLocationSchemaClass.name, schema: DriverLocationSchema }]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
