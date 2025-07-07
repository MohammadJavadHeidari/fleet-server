import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// decorators
import { PublicRoute } from '@src/common/decorators/public.decorator';
// dto
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  me() {
    return this.authService.me();
  }

  @Post('otp/request')
  @PublicRoute()
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.authService.sendOtp(dto);
  }

  @Post('otp/verify')
  @PublicRoute()
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
