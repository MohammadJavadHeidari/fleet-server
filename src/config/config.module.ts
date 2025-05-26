import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// configs
import { ENV_KEY } from '@src/config/config.type';
import * as  Joi from 'joi';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        // [ENV_KEY.NODE_ENV]: Joi.string().required(),
        // [ENV_KEY.PORT]: Joi.number().default(3000),
        // [ENV_KEY.APP_NAME]: Joi.string().default('Fleet Manager Server'),
        // [ENV_KEY.API_PREFIX]: Joi.string().default('api'),

        [ENV_KEY.MONGO_URL]: Joi.string().required(),
        [ENV_KEY.MONGO_DBNAME]: Joi.string().required().default('fleet-manager'),

        // [ENV_KEY.CACHE_STORE]: Joi.string().required(),
        // [ENV_KEY.CACHE_TTL]: Joi.number().default(60 * 60 * 1000),
        // [ENV_KEY.CACHE_MAX]: Joi.number().default(100),

        [ENV_KEY.JWT_TOKEN_SECRET]: Joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule implements OnApplicationBootstrap {
  constructor(private readonly appConfigService: AppConfigService) {}

  onApplicationBootstrap() {
    console.log('---- ApplicationBootstrap ----');
  }
}
