import { Injectable } from '@nestjs/common';
import { ClsService as BaseClsService, ClsStore } from 'nestjs-cls';

interface AuthUser extends ClsStore {
    requestId: string;
    token: string;
}
@Injectable()
export class ClsService extends BaseClsService<AuthUser> { }
