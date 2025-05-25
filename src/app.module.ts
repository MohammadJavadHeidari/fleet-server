import { Module } from '@nestjs/common';
import { AppService } from '@src/app.service';
// modules
import { CoreModule } from './core/core.module';
import { ApiModules } from '@src/apis/api.module';

@Module({
  imports: [
    CoreModule,
    ApiModules
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
