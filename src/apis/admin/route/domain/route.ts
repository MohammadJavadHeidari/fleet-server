import { Station } from '@src/apis/admin/station/domain/station';

export class Route {
  id: string;
  name: string;
  stations: Station[];
  createdAt: Date;
  updatedAt: Date;
}
