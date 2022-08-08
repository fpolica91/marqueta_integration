import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FetchService } from './services/fetch.service';
import { CardProductModule } from './card-product/card-product.module';
import { CardProductSchema } from './schemas/card-product.schema';

@Module({
  controllers: [AppController],
  providers: [AppService, FetchService, ConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/cards', {
      useNewUrlParser: true,
      dbName: 'cards',
    }),
    MongooseModule.forFeature([
      { name: 'CardProduct', schema: CardProductSchema },
    ]),
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
    CardProductModule,
  ],
})
export class AppModule {}
