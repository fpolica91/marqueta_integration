import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FetchService {
  constructor(private httpService: HttpService) {}
  getPosts() {
    const response = this.httpService.get('/cardproducts');
    return response;
  }
}
