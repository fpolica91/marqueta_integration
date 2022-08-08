import { Controller, Get, Post, Request } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CardProductService } from './card-product.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardProductDocument } from 'src/schemas/card-product.schema';

@Controller('card-product')
export class CardProductController {
  constructor(
    private readonly cardProductService: CardProductService,
    @InjectModel('CardProduct') private cardModel: Model<CardProductDocument>,
  ) {}
  @Get()
  async getCardProducts(): Promise<any> {
    const cardProducts = await firstValueFrom(
      this.cardProductService.getCardProducts(),
    );
    const cardProductsArray = cardProducts.data;
    cardProductsArray.data.map((i) => this.cardModel.create(i));
    return cardProducts.data;
  }
  @Post('create')
  async createCardProduct(@Request() req): Promise<any> {
    const { name, start_date } = req.body;
    try {
      const response = await lastValueFrom(
        this.cardProductService.createCardProduct({
          name,
          start_date,
        }),
      );

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
