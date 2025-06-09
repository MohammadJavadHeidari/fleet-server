import { Controller, Get, Post, Body } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';

@Controller()
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get('list')
  getStations() {
    return this.stationService.getStations();
  }

  @Post('new')
  create(@Body() createStation: CreateStationDto) {
    return this.stationService.create(createStation);
  }
}
