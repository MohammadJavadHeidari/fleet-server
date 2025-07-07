import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
// decorator
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_ROUTE_KEY } from '@src/common/decorators/public.decorator';
import { ClsService } from '../cls/cls.service';

@Injectable()
export class DriverAuthGuard implements CanActivate {
  private readonly UNAUTHENTICATED_MESSAGE = 'Driver is currently unauthorized, kindly authenticate to continue.';

  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly cls: ClsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();

      const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      //check whether the route is public or not
      if (isPublicRoute) {
        return true;
      }

      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException(this.UNAUTHENTICATED_MESSAGE);
      }

      try {
        const payload = await this.jwtService.verifyAsync<{ userId: string; phoneNumber: string }>(token, {
          secret: process.env.JWT_TOKEN_SECRET,
        });

        this.cls.set('driver', {
          id: payload.userId,
          phoneNumber: payload.phoneNumber,
        });
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
