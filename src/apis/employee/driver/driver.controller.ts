import { Controller, Get } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller()
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('location')
  getDriverLocation() {
    return this.driverService.getDriverLocation();
  }
}
