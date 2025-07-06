import { Route } from '../domain/route';
import { RouteSchemaClass } from '../entities/route.schema';

export class RouteMapper {
  static toDomain(raw: RouteSchemaClass): Route {
    const route = new Route();
    route.id = raw._id.toString();
    route.name = raw.name;
    route.createdAt = raw.createdAt;
      route.updatedAt = raw.updatedAt;
    return route;
  }
}
