import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument, now } from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';

export type StationDocument = HydratedDocument<StationSchemaClass>;

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export const COLLECTION_STATIONS = 'stations';

@Schema({
  collection: COLLECTION_STATIONS,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class StationSchemaClass extends EntityDocumentHelper {
  @Prop(String)
  name: string;

  @Prop(String)
  address: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (val: number[]) => val.length === 2,
        message: 'coordinates must be [lng, lat]',
      },
    },
  })
  location: GeoPoint;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}
const StationSchema = SchemaFactory.createForClass(StationSchemaClass);

StationSchema.index({ location : "2dsphere"})

StationSchema.virtual('id').get(function () {
  return this._id;
});

export { StationSchema };
