/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardProductDocument } from 'src/schemas/card-product.schema';

@Injectable()
export class CardProductService {
  constructor(
    private httpService: HttpService,
    @InjectModel('CardProduct') private cardModel: Model<CardProductDocument>,
  ) {}

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

  createCardProduct({
    name,
    start_date,
  }: {
    name: string;
    start_date: string;
  }) {
    try {
      const response = this.httpService.post('/cardproducts', {
        name,
        start_date,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
