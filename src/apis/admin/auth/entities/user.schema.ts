import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
// utils
import { EntityDocumentHelper } from '@src/common/utils/document-entity-helper';

export type UserDocument = HydratedDocument<UserSchemaClass>;
export const COLLECTION_USERS = 'users';

@Schema({
  collection: COLLECTION_USERS,
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
    required: true
  })
  username: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop(String)
  email: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}
const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

UserSchema.virtual('id').get(function () {
  return this._id;
});

export { UserSchema }