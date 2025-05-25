import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// services
import { ClsService } from '@src/common/cls/cls.service';
// decorator
// import { ROLES_KEY, RolesParams } from '@src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly cls: ClsService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        // const role = this.reflector.getAllAndOverride<RolesParams>(ROLES_KEY, [context.getHandler(), context.getClass()]);;

        // if (!role) return true;

        // const acl = this.cls.get("user.acl");

        // let hasSubjectRole = acl.list.find(item => item.name == role.page);

        // // user does not have the role
        // if (!hasSubjectRole) return false;

        // let hasUserActionRole = hasSubjectRole.permissions.find(permission => permission == role.action);

        // // user does not have the role
        // if (!hasUserActionRole) return false;

        return true;
    }
}