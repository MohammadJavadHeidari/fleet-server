import { Station } from '../domain/station';
import { StationSchemaClass } from '../entities/station.schema';

export class StationMapper {
  static toDomain(raw: StationSchemaClass): Station {
    const station = new Station();
    station.id = raw._id.toString();
    station.name = raw.name;
    station.address = raw.address;
    station.isActive = raw.isActive;
    station.lat = raw.location.coordinates[0];
    station.lng = raw.location.coordinates[1];
    station.createdAt = raw.createdAt;
    station.updatedAt = raw.updatedAt;
    return station;
  }
}
