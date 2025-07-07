import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';

export type DriverLocationDocument = HydratedDocument<DriverLocationSchemaClass>;
export const COLLECTION_DRIVERS_LOCATION = 'driver-location';

@Schema({
  collection: COLLECTION_DRIVERS_LOCATION,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class DriverLocationSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'drivers',
    required: true,
  })
  driverId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  lat: string;

  @Prop({
    type: String,
    required: true,
  })
  lng: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}
const DriverLocationSchema = SchemaFactory.createForClass(DriverLocationSchemaClass);

DriverLocationSchema.virtual('id').get(function () {
  return this._id;
});

export { DriverLocationSchema };
