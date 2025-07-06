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
      results:{
        data: stations.map(StationMapper.toDomain),
        total: stations.length,
      },
    };
  }

  async create(createStation: CreateStationDto) {
    // Check if station already exists by title
    const existingStationByTitle = await this.stationModel.findOne({
      name: createStation.name,
    });

    if (existingStationByTitle) {
      throw new BadRequestException('Station with this title already exists');
    }

    const { lng, lat, ...stationData } = createStation;

    const station = await this.stationModel.create({
      ...stationData,
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

    return {
      success: true,
      message: 'Station created successfully',
      results: StationMapper.toDomain(station),
    };
  }

}
