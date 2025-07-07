import { Injectable } from '@nestjs/common';
import { SaveDriverLocationDto } from './dto/save-location.dto';
import { DriverLocationSchemaClass } from './entities/driver-location.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClsService } from '@src/common/cls/cls.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(DriverLocationSchemaClass.name) private readonly driverLocationModel: Model<DriverLocationSchemaClass>,
    private readonly cls: ClsService,
  ) {}

  async saveLocation(saveDriverLocationDto: SaveDriverLocationDto) {
    try {
      console.log(saveDriverLocationDto);

      const driverId = this.cls.get('driver.id');
      const driverLocation = await this.driverLocationModel.create({
        driverId,
        ...saveDriverLocationDto,
      });

      return {
        success: true,
        message: 'Location saved successfully',
        data: driverLocation,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error saving location',
        data: {},
      };
    }
  }
}
