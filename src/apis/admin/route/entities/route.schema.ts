import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Schema as MongooseSchema } from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';
import { Station } from '../../station/domain/station';

export type RouteDocument = HydratedDocument<RouteSchemaClass>;

export const COLLECTION_ROUTES = 'routes';

@Schema({
  collection: COLLECTION_ROUTES,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class RouteSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'stations' }],
    required: true,
    validate: {
      validator: (val: any[]) => val.length >= 2,
      message: 'Route must have at least 2 stations (starting and ending station)',
    },
  })
  stations: MongooseSchema.Types.ObjectId[]; // Ordered array: [0] = starting station, [last] = ending station, [middle] = pickup stops

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}
const RouteSchema = SchemaFactory.createForClass(RouteSchemaClass);

// Add virtuals for easy access to starting and ending stations
RouteSchema.virtual('startingStation').get(function () {
  return this.stations[0] as unknown as Station;
});

RouteSchema.virtual('endingStation').get(function () {
  return this.stations[this.stations.length - 1] as unknown as Station;
});

RouteSchema.virtual('pickupStops').get(function () {
  return this.stations.slice(1, -1) as unknown as Station[]; // All stations except first and last
});

RouteSchema.virtual('id').get(function () {
  return this._id;
});

export { RouteSchema };
