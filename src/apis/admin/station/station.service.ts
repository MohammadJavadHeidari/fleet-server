import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { StationSchemaClass } from './entities/station.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StationMapper } from './mappers/station.mapper';


@Injectable()
export class StationService {
  
  constructor(
    @InjectModel(StationSchemaClass.name)
    private readonly stationModel: Model<StationSchemaClass>,
  ) {}

  async getStations() {
    const stations = await this.stationModel.find().lean();

    return {
      success: true,
      message: 'Stations fetched successfully',
      results: stations.map(StationMapper.toDomain),
    };
  }

  async create(createStation: CreateStationDto) {
    // Check if station already exists by title
    const existingStationByTitle = await this.stationModel.findOne({
      title: createStation.title,
    });

    if (existingStationByTitle) {
      throw new BadRequestException('Station with this title already exists');
    }

    const station = await this.stationModel.create(createStation);

    return {
      success: true,
      message: 'Station created successfully',
      results: StationMapper.toDomain(station),
    };
  }

}
