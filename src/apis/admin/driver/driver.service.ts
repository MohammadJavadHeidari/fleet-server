import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverSchemaClass, DriverWithVirtuals } from './entities/driver.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DriverMapper } from './mappers/driver.mapper';
import { RouteSchemaClass } from '../route/entities/route.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(DriverSchemaClass.name)
    private readonly driverModel: Model<DriverSchemaClass>,
    @InjectModel(RouteSchemaClass.name)
    private readonly routeModel: Model<RouteSchemaClass>,
  ) {}

  async getDrivers() {
    const drivers = await this.driverModel.find().populate({
      path: 'routeId',
      model: this.routeModel,
    });

    return {
      success: true,
      message: 'Drivers fetched successfully',
      results: {
        data: drivers.map((driver) => DriverMapper.toDomain(driver as unknown as DriverWithVirtuals)),
        total: drivers.length,
      },
    };
  }

  async create(createDriverDto: CreateDriverDto) {
    // Check if driver already exists by phone number
    const existingDriverByPhone = await this.driverModel.findOne({
      phoneNumber: createDriverDto.phoneNumber,
    });

    if (existingDriverByPhone) {
      throw new BadRequestException('Driver with this phone number already exists');
    }

    // Check if driver already exists by national ID
    const existingDriverByNationalId = await this.driverModel.findOne({
      nationalId: createDriverDto.nationalId,
    });

    if (existingDriverByNationalId) {
      throw new BadRequestException('Driver with this national ID already exists');
    }

    // Check if driver already exists by car plate number combination
    const existingDriverByPlate = await this.driverModel.findOne({
      licensePlateTwoDigit: createDriverDto.licensePlateTwoDigit,
      licensePlateLetter: createDriverDto.licensePlateLetter,
      licensePlateThreeDigit: createDriverDto.licensePlateThreeDigit,
      licensePlateProvince: createDriverDto.licensePlateProvince,
    });

    if (existingDriverByPlate) {
      throw new BadRequestException('Driver with this license plate already exists');
    }

    const driver = await this.driverModel.create(createDriverDto);

    return {
      success: true,
      message: 'Driver created successfully',
      results: DriverMapper.toDomain(driver as unknown as DriverWithVirtuals),
    };
  }
}
