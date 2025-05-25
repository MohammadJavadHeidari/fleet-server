import { Module } from '@nestjs/common';
// providers
import { mongoProvider } from './mongo/mongo.providers';


@Module({
    imports: [...mongoProvider],
    exports: [...mongoProvider]
})
export class DatabaseModule { }
