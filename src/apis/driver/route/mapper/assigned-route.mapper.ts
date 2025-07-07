
import { StationSchemaClass } from "@src/apis/admin/station/entities/station.schema";


export class AssignedRouteMapper {
  static toDomain(raw: StationSchemaClass) {
    return [raw.location.coordinates[0], raw.location.coordinates[1]]
  }
}