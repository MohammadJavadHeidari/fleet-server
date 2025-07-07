import { Controller, Get } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller()
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('assigned')
  getDriverAssignedRoute() {
    return this.routeService.getAssignedRoute();
  } 
}
