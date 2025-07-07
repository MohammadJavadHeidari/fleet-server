import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
// dto
import { SaveDriverLocationDto } from './dto/save-location.dto';

@Controller()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('save')
  saveLocation(@Body() saveDriverLocationDto: SaveDriverLocationDto) {
    return this.locationService.saveLocation(saveDriverLocationDto);
  }
}
