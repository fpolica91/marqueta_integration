/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardProductService {
  constructor(private httpService: HttpService) {}

  getCardProducts() {
    try {
      const response = this.httpService.get('/cardproducts');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  createCardProduct() {}
}
