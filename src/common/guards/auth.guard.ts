import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
// service
import { AuthService } from '@src/common/guards/services/auth.service';
import { ClsService } from '@src/common/cls/cls.service';
// decorator
import { JwtService } from '@nestjs/jwt';
// import { IS_PUBLIC_ROUTE_KEY } from '@src/common/decorators/public.decorator';
// import { TokenPayload } from '../types/token.payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly UNAUTHENTICATED_MESSAGE = "User is currently unauthorized, kindly authenticate to continue.";
    
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly cls: ClsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const request = context.switchToHttp().getRequest<Request>();

        // const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);

        // //check whether the route is public or not
        // if (isPublicRoute) {
        //     return true;
        // }

        // const { appId, token } = request.user;

        // if (!token) {
        //     throw new UnauthorizedException(this.UNAUTHENTICATED_MESSAGE);
        // }

        // const payload = await this.jwtService
        //     .verifyAsync<TokenPayload>(token)
        //     .catch(error => {
        //         console.error(error);
        //         throw new UnauthorizedException(this.UNAUTHENTICATED_MESSAGE, error.message);
        //     });


        // if (!payload) throw new UnauthorizedException(this.UNAUTHENTICATED_MESSAGE);

        // let userInfo = await this.authService.fetchCachedUserInfo({ userId: payload.user_id, appId, token });

        // this.cls.set('user', {
        //     ...userInfo.user,
        //     app: userInfo.app,
        //     acl: userInfo.acl,
        //     token,
        // });

        // console.log(`≡≡≡≡≡≡ AUTHENTICATE USER: ${userInfo.user.email} ≡≡≡≡≡≡ \n`);

        return true;
    }
}