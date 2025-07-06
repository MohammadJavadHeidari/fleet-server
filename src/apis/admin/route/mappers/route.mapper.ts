import { StationSchemaClass } from '../../station/entities/station.schema';
import { StationMapper } from '../../station/mappers/station.mapper';
import { Route } from '../domain/route';
import { RouteSchemaClass } from '../entities/route.schema';

export class RouteMapper {
  static toDomain(raw: RouteSchemaClass): Route {
    const route = new Route();
    route.id = raw._id.toString();
    route.name = raw.name;
    route.createdAt = raw.createdAt;
    route.updatedAt = raw.updatedAt;
    route.stations = raw.stations.map((station) => StationMapper.toDomain(station as unknown as StationSchemaClass));
    return route;
  }
}
