import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller()
export class DriverController {
  constructor(private readonly driverService: DriverService) {}


  @Get("list")
  getDrivers() {
    return this.driverService.getDrivers();
  }

  @Post('new')
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }
}
