import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverSchemaClass } from './entities/driver.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from '@src/common/cls/cls.service';
import { DriverMapper } from './mappers/driver.mapper';

@Injectable()
export class DriverService {
  
  constructor(
    @InjectModel(DriverSchemaClass.name)
    private readonly driverModel: Model<DriverSchemaClass>,
    private readonly jwtService: JwtService,
    private readonly cls: ClsService,
  ) {}

  async getDrivers() {
    const drivers = await this.driverModel.find().lean();

    return {
      success: true,
      message: 'Drivers fetched successfully',
      results: drivers.map(DriverMapper.toDomain),
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
      results: DriverMapper.toDomain(driver),
    };
  }

}
