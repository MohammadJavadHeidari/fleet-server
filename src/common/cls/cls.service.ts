import { Injectable } from '@nestjs/common';
import { ClsService as BaseClsService, ClsStore } from 'nestjs-cls';

interface AuthUser extends ClsStore {
  requestId: string;
  accessToken: string;
  user: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
@Injectable()
export class ClsService extends BaseClsService<AuthUser> {}
