import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import * as mongoose from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';
import { Station } from '../../station/domain/station';

export type EmployeeDocument = HydratedDocument<EmployeeSchemaClass>;

export type EmployeeWithVirtuals = EmployeeSchemaClass & { fullName: string; stationId: Station };

export const COLLECTION_EMPLOYEES = 'employees';

@Schema({
  collection: COLLECTION_EMPLOYEES,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class EmployeeSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
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
  email: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations',
    required: true,
  })
  stationId: mongoose.Types.ObjectId;

  @Prop({ default: true })
  password: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

const EmployeeSchema = SchemaFactory.createForClass(EmployeeSchemaClass);

EmployeeSchema.virtual('id').get(function () {
  return this._id;
});

EmployeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export { EmployeeSchema };
