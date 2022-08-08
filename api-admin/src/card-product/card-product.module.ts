import { Module } from '@nestjs/common';
import { CardProductService } from './card-product.service';
import { CardProductController } from './card-product.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CardProductSchema } from 'src/schemas/card-product.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
  ],
  controllers: [CardProductController],
  providers: [CardProductService],
})
export class CardProductModule {}
