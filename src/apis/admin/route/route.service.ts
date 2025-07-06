import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteSchemaClass } from './entities/route.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RouteMapper } from './mappers/route.mapper';
import { StationSchemaClass } from '../station/entities/station.schema';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(RouteSchemaClass.name) private readonly routeModel: Model<RouteSchemaClass>,
    @InjectModel(StationSchemaClass.name) private readonly stationModel: Model<StationSchemaClass>,
  ) {}

  async getRoutes() {
    const routes = await this.routeModel
      .find()
      .populate({
        path: 'stations',
        model: this.stationModel,
      })
      .lean();

    return {
      success: true,
      message: 'Routes fetched successfully',
      results: {
        data: routes.map(RouteMapper.toDomain),
        total: routes.length,
      },
    };
  }

  async create(createRoute: CreateRouteDto) {
    // Check if route already exists by title
    const existingRouteByTitle = await this.routeModel.findOne({
      name: createRoute.name,
    });

    if (existingRouteByTitle) {
      throw new BadRequestException('Route with this title already exists');
    }

    const route = await this.routeModel.create({ ...createRoute });

    return {
      success: true,
      message: 'Route created successfully',
      results: RouteMapper.toDomain(route),
    };
  }
}
