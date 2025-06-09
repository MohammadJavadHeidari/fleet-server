import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument, now } from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';

export type DriverDocument = HydratedDocument<DriverSchemaClass>;
export const COLLECTION_DRIVERS = 'drivers';

@Schema({
  collection: COLLECTION_DRIVERS,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class DriverSchemaClass extends EntityDocumentHelper {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  nationalId: string;

  @Prop(String)
  address: string;

  @Prop(String)
  comment: string;

  @Prop(String)
  carBrand: string;

  @Prop(String)
  carColor: string;

  @Prop(Number)
  carProductionDate: number;

  @Prop({
    type: Number,
    required: true,
  })
  licensePlateTwoDigit: number;

  @Prop({
    type: String,
    required: true,
  })
  licensePlateLetter: string;

  @Prop({
    type: Number,
    required: true,
  })
  licensePlateThreeDigit: number;

  @Prop({
    type: Number,
    required: true,
  })
  licensePlateProvince: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}
const DriverSchema = SchemaFactory.createForClass(DriverSchemaClass);

// Create compound unique index for license plate
DriverSchema.index(
  {
    licensePlateTwoDigit: 1,
    licensePlateLetter: 1,
    licensePlateThreeDigit: 1,
    licensePlateProvince: 1,
  },
  { unique: true }
);

DriverSchema.virtual('id').get(function () {
  return this._id;
});

export { DriverSchema };
