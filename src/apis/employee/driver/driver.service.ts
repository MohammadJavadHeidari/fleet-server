import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
//
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from '@src/common/cls/cls.service';
// entities
import { EmployeeSchemaClass } from '@src/apis/admin/employee/entities/employee.schema';
import { DriverSchemaClass } from '@src/apis/admin/driver/entities/driver.schema';
import { StationSchemaClass } from '@src/apis/admin/station/entities/station.schema';
import { RouteSchemaClass } from '@src/apis/admin/route/entities/route.schema';
import { DriverLocationSchemaClass } from '@src/apis/driver/location/entities/driver-location.schema';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(EmployeeSchemaClass.name) private readonly employeeModel: Model<EmployeeSchemaClass>,
    @InjectModel(DriverSchemaClass.name) private readonly driverModel: Model<DriverSchemaClass>,
    @InjectModel(StationSchemaClass.name) private readonly stationModel: Model<StationSchemaClass>,
    @InjectModel(RouteSchemaClass.name) private readonly routeModel: Model<RouteSchemaClass>,
    @InjectModel(DriverLocationSchemaClass.name) private readonly driverLocationModel: Model<DriverLocationSchemaClass>,
    //
    private readonly cls: ClsService,
  ) {}

  async getDriverLocation() {
    try {
      const employeeId = this.cls.get('employee.id');

      // Check if user already exists
      const existingEmployee = await this.employeeModel.findById(employeeId).lean();

      if (!existingEmployee) {
        throw new BadRequestException('Employee not found');
      }

      const { stationId } = existingEmployee;

      const existingStation = await this.stationModel.findById(stationId).lean();

      if (!existingStation) {
        throw new BadRequestException('Station not found');
      }

      const existingRoute = await this.routeModel.findOne({ stations: { $in: [existingStation._id] } }).lean();

      if (!existingRoute) {
        throw new BadRequestException('Route not found');
      }

      const { _id: routeId } = existingRoute;

      const existingDriver = await this.driverModel.findOne({ routeId }).lean();

      if (!existingDriver) {
        throw new BadRequestException('Driver not found');
      }

      const { _id: driverId } = existingDriver;

      const existingDriverLocation = await this.driverLocationModel.findOne({ driverId }).sort({ createdAt: -1 }).lean();

      if (!existingDriverLocation) {
        throw new BadRequestException('Driver location not found');
      }

      const { lat, lng } = existingDriverLocation;

      return {
        success: true,
        message: 'Driver location fetched successfully',
        results: { driverLocation: { lat, lng } },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error fetching driver location',
        data: {},
      };
    }
  }
}
