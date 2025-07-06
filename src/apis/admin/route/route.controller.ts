import { Controller, Get, Post, Body } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';

@Controller()
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('list')
  getRoutes() {
    return this.routeService.getRoutes();
  }

  @Post('new')
  create(@Body() createRoute: CreateRouteDto) {
    return this.routeService.create(createRoute);
  }
}
