import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppModel } from './store/app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('/')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/Hello')
  async hello() {
    return await AppModel.find()
  }
}
