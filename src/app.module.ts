import { Module } from '@nestjs/common';
import { AppService } from '@src/app.service';
// modules
import { ApiModules } from '@src/apis/api.module';

@Module({
  imports: [
    ApiModules
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
