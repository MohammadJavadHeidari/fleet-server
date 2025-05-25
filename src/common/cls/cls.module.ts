import { Global, Module } from '@nestjs/common';
import {
    ClsModule as BaseClsModule,
    ClsService as BaseClsService
} from 'nestjs-cls';
import { ClsService } from './cls.service';
// utility
import { generateRequestId } from '@src/common/utils/request-id-generator';

@Global()
@Module({
    imports: [
        BaseClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
                idGenerator: () => generateRequestId()
            }
        }),
    ],
    providers: [
        {
            provide: ClsService,
            useExisting: BaseClsService,
        },
    ],
    exports: [ClsService],
})
export class ClsModule { }
