import { Injectable } from '@nestjs/common';
import { ClsService as BaseClsService, ClsStore } from 'nestjs-cls';

interface AuthUser extends ClsStore {
  requestId: string;
  accessToken: string;
  admin?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  driver?: {
    id?: string;
    phoneNumber?: string;
  };
  employee?: {
    id?: string;
    phoneNumber?: string;
  };
}
@Injectable()
export class ClsService extends BaseClsService<AuthUser> {}
