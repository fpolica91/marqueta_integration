import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { FetchService } from './services/fetch.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fetchService: FetchService,
  ) {}

  @Get('/posts')
  async getPosts(): Promise<any> {
    const posts = await firstValueFrom(this.fetchService.getPosts());
    return posts.data;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
