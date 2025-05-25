import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
// services
import { AuthService } from '@src/common/guards/services/auth.service';
import { AppConfigModule } from '@src/config/config.module';
import { AppConfigService } from '@src/config/config.service';

@Module({
  imports: [
    HttpModule,
    AppConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.get<string>('JWT_TOKEN_SECRET')
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [
    AuthService,
  ],
  exports: [AuthService],
})
export class GuardsModule { }
