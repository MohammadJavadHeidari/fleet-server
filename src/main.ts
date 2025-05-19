import { NestFactory, } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { AppService } from '@src/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get<AppService>(AppService);

  appService.setHelmet(app);
  appService.setCompression(app);
  appService.setCookieParser(app);

  // appService.setGlobalPipe(app);
  // appService.setGlobalInterceptor(app);

  // appService.setGlobalFilter(app);

  appService.setGlobalPrefix(app);

  // appService.setEnableVersioning(app);
  // appService.setEnableShutdownHooks(app);

  // appService.setSwagger(app);

  await appService.startingServer(app);
}

bootstrap()