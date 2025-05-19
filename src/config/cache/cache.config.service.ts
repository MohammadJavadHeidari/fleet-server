import { Injectable, } from '@nestjs/common';
import { ENV_KEY } from '@src/config/config.type';
import { AppConfigService } from '@src/config/config.service';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) { }

  createCacheOptions(): CacheModuleOptions {
    return {
      store: this.appConfigService.get<string>("CACHE_STORE"),
      ttl: this.appConfigService.get<number>("CACHE_TTL"),
      max: this.appConfigService.get<number>("CACHE_MAX"),
    };
  }
}
