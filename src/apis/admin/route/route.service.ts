import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteSchemaClass } from './entities/route.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RouteMapper } from './mappers/route.mapper';


@Injectable()
export class RouteService {
  
  constructor(
    @InjectModel(RouteSchemaClass.name)
    private readonly routeModel: Model<RouteSchemaClass>,
  ) {}

  async getRoutes() {
    const routes = await this.routeModel.find().lean();

    return {
      success: true,
      message: 'Routes fetched successfully',
      results:{
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

   

    return {
      success: true,
      message: 'Route created successfully',
      // results: RouteMapper.toDomain(),
    };
  }

}
