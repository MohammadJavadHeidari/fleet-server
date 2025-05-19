import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '@src/common/types/environment.enum';
import { ENV_KEY } from '@src/config/config.type';

type Key = keyof typeof ENV_KEY;

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<typeof ENV_KEY, true>) {}

  get<T extends string | number>(key: Key): T {
    return this.configService.get<T>(key);
  }

  getList(...keys: Key[]): (string | number)[] {
    return keys.map((key) => {
      return this.get(ENV_KEY[key]);
    });
  }

  getAll(): (string | number)[] {
    return Object.values(ENV_KEY).map((key) => {
      return this.get<typeof key>(key);
    });
  }

  getAllMap(): Record<Key, string | number> {
    return Object.entries(ENV_KEY).reduce(
      (
        acc: Record<Key, string | number>,
        [key, value]: [Key, (typeof ENV_KEY)[Key]],
      ) => {
        acc[key] = this.get<string | number>(value);
        return acc;
      },
      <Record<Key, string | number>>{},
    );
  }

  isTest(): boolean {
    return this.get<string>(ENV_KEY.NODE_ENV) === Environment.TEST;
  }

  isDevelopment(): boolean {
    return this.get<string>(ENV_KEY.NODE_ENV) === Environment.DEVELOPMENT;
  }

  isProduction(): boolean {
    return this.get<string>(ENV_KEY.NODE_ENV) === Environment.PRODUCTION;
  }
}
