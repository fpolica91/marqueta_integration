import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FetchService } from './services/fetch.service';

@Module({
  controllers: [AppController],
  providers: [AppService, FetchService, ConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('MARQUETA_ENDPOINT'),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${configService.getOrThrow<string>(
            'MARQUETA_TOKEN',
          )}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
