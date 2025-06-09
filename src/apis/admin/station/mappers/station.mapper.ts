import { Station } from '../domain/station';
import { StationSchemaClass } from '../entities/station.schema';

export class StationMapper {
  static toDomain(raw: StationSchemaClass): Station {
    const station = new Station();
    station.id = raw._id.toString();
    station.title = raw.title;
    station.address = raw.address;
    station.isEnable = raw.isEnable;
    station.latitude = raw.location.coordinates[0];
    station.longitude = raw.location.coordinates[1];
    station.createdAt = raw.createdAt;
    station.updatedAt = raw.updatedAt;
    return station;
  }
}
