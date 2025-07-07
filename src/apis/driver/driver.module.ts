import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { DriverAuthGuard } from '@src/common/guards/driver-auth.guard';
// routes
import { driverRoutes } from '@src/apis/driver/driver.routes';
// modules
import { AuthModule } from '@src/apis/driver/auth/auth.module';

@Module({
  imports: [
    RouterModule.register([driverRoutes]),
     AuthModule,
    ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DriverAuthGuard,
    },
  ],
})
export class DriverModule {}
