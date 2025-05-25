import { Module } from '@nestjs/common';
// Health
import { HealthModule } from '@src/apis/health/health.module';
// Modules
import { AdminModule } from '@src/apis/admin/admin.module';

@Module({
  imports: [HealthModule, AdminModule],
})
export class ApiModules {}
