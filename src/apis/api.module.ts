import { Module } from '@nestjs/common';
// Health
import { HealthModule } from '@src/apis/health/health.module';
// Modules

@Module({
  imports: [HealthModule],
})
export class ApiModules {}
