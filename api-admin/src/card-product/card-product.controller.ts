import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CardProductService } from './card-product.service';

@Controller('card-product')
export class CardProductController {
  constructor(private readonly cardProductService: CardProductService) {}
  @Get()
  async me(): Promise<any> {
    const cardProducts = await firstValueFrom(
      this.cardProductService.getCardProducts(),
    );
    return cardProducts.data;
  }
}
