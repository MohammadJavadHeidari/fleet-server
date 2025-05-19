import { Module, } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './cache.config.service';
import { AppConfigModule } from '@src/config/config.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [AppConfigModule],
      useClass: CacheConfigService,
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule { }
