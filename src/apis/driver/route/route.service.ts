import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClsService } from '@src/common/cls/cls.service';
// schemas
import { StationSchemaClass } from '@src/apis/admin/station/entities/station.schema';
import { DriverSchemaClass } from '@src/apis/admin/driver/entities/driver.schema';
import { RouteSchemaClass } from '@src/apis/admin/route/entities/route.schema';
import { AssignedRouteMapper } from './mapper/assigned-route.mapper';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(RouteSchemaClass.name) private readonly routeModel: Model<RouteSchemaClass>,
    @InjectModel(DriverSchemaClass.name) private readonly driverModel: Model<DriverSchemaClass>,
    @InjectModel(StationSchemaClass.name) private readonly stationModel: Model<StationSchemaClass>,
    private readonly cls: ClsService,
  ) {}

  async getAssignedRoute() {
    const driverId = this.cls.get('driver.id');

    const driver = await this.driverModel.findById(driverId).lean();

    if (!driver) {
      throw new BadRequestException('Driver not found');
    }

    const route = await this.routeModel
      .findById(driver.routeId)
      .populate({
        path: 'stations',
        model: this.stationModel,
      })
      .lean();

    if (!route) {
      throw new BadRequestException('Route not found');
    }

    const coordinates = route.stations.map((station) =>
      AssignedRouteMapper.toDomain(station as unknown as StationSchemaClass),
    );

    return {
      success: true,
      message: 'Route fetched successfully',
      results: coordinates,
    };
  }
}
