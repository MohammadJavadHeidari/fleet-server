import {
  ClassSerializerInterceptor,
  INestApplication,
  Injectable,
  RequestMethod,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ERROR_CODE } from '@src/constants/error-response-code.constant';
// import { ENV_KEY } from '@src/config/config.type';
// import { AppConfigService } from '@src/config/config.service';
// import { PrismaService } from '@src/core/prisma/prisma.service';
// import { SuccessInterceptor } from '@src/interceptors/success-interceptor/success.interceptor';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as compression from 'compression';
// import { ERROR_CODE } from './constants/error-response-code.constant';
import { object } from 'joi';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AppService {
  // constructor(private readonly appConfigService: AppConfigService) {}

  // setCors(app: INestApplication): void {
  //   // if (!this.appConfigService.isProduction()) {
  //   //   return;
  //   // }

  //   app.enableCors({
  //     origin: '*',
  //     credentials: true,
  //   });
  // }

  setHelmet(app: INestApplication): void {
    app.use(helmet());
  }

  setCompression(app: INestApplication): void {
    app.use(compression());
  }

  setCookieParser(app: INestApplication): void {
    app.use(cookieParser());
  }

  // setGlobalPipe(app: INestApplication): void {
  //   const exceptionFactory = (errors: ValidationError[]): void => {
  //     console.log(errors);

  //     const messages = errors.flatMap((error) => {
  //       let errorMessage = error.constraints ?
  //         Object.values(error.constraints || {}) :
  //         error.children.flatMap((error) => Object.values(error.constraints || {}));

  //       return errorMessage
  //     });

  //     throw new HttpBadRequestException({
  //       errorCode: ERROR_CODE.CODE003,
  //       message: messages[0],
  //     });
  //   };

  //   app.useGlobalPipes(
  //     new ValidationPipe({
  //       transform: true,
  //       stopAtFirstError: true,
  //       whitelist: true,
  //       exceptionFactory,
  //     }),
  //   );
  // }

  // setGlobalInterceptor(app: INestApplication): void {
  //   app.useGlobalInterceptors(
  //     new ClassSerializerInterceptor(app.get(Reflector), {
  //       excludePrefixes: ['_'],
  //     }),
  //     // app.get(SuccessInterceptor),
  //   );
  // }

  // setGlobalFilter(app: INestApplication): void {
  //   console.log("_____________ setGlobalFilter ____________");
  //   app.useGlobalFilters(
  //     // app.get(HttpProcessErrorExceptionFilter),
  //     // app.get(HttpRemainderExceptionFilter),
  //     // app.get(HttpInternalServerErrorExceptionFilter),
  //     // app.get(HttpNotFoundExceptionFilter),
  //     // app.get(HttpPathNotFoundExceptionFilter),
  //     // app.get(HttpForbiddenExceptionFilter),
  //     // app.get(HttpUnauthorizedExceptionFilter),
  //     app.get(HttpBadRequestExceptionFilter),
  //   );
  // }

  setGlobalPrefix(app: INestApplication): void {
    app.setGlobalPrefix('api', {
      exclude: ['health'],
    });
  }

  setEnableVersioning(app: INestApplication): void {
    app.enableVersioning({
      type: VersioningType.URI,
    });
  }

  // async setEnableShutdownHooks(app: INestApplication): Promise<void> {
  //   const appConfigService = app.get<AppConfigService>(AppConfigService);

  //   if (!appConfigService.isProduction()) {
  //     return;
  //   }

  //   app.enableShutdownHooks();
  // }

  // setSwagger(app: INestApplication): void {
  //   if (this.appConfigService.isProduction()) {
  //     return;
  //   }

  //   const config = new DocumentBuilder()
  //     .setTitle('SCM Document')
  //     .setDescription('simotel central management api document')
  //     .setVersion('1.0.0')
  //     .build();

  //   const document = SwaggerModule.createDocument(app, config);

  //   SwaggerModule.setup('docs', app, document);
  // }

  async startingServer(app: INestApplication): Promise<void> {
    // const PORT = this.appConfigService.get<number>(ENV_KEY.PORT);
    await app.listen(3000);

    console.info(`server listening on ${await app.getUrl()}`);
  }
}
