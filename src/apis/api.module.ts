import { Module } from '@nestjs/common';
// Modules
import { AdminModule } from '@src/apis/admin/admin.module';

@Module({
  imports: [AdminModule],
})
export class ApiModules {}
