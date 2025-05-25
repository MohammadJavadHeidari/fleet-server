import { MongooseModule } from '@nestjs/mongoose';
// types
import { AppConfigModule } from '@src/config/config.module';
import { AppConfigService } from '@src/config/config.service';
import { Connection } from 'mongoose';

export const mongoProvider = [
  MongooseModule.forRootAsync({
    imports: [AppConfigModule],
    useFactory: async (appConfigService: AppConfigService) => {
      console.log(appConfigService.get<string>('MONGO_URL'))
      console.log(appConfigService.get<string>('MONGO_DBNAME'))
      return {
        uri: appConfigService.get<string>('MONGO_URL'),
        dbName: appConfigService.get<string>('MONGO_DBNAME'),
        authSource: 'admin',
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            console.log('🎯 mongo connected successfully!');
          }

          connection.on('disconnected', () => {
            console.log("mongo disconnected!");
          });

          connection.on('reconnected', () => {
            console.log("mongo reconnected!\n");
          });

          connection.on('error', (error) => {
            console.log(error.message || error, { context: 'MongoConnection' });
          });

          return connection;
        }
      };
    },
    inject: [AppConfigService],
  })
];
