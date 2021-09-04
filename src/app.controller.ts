import { Controller, Get, Inject, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { StorageService } from './storage/storage.service';
import { AppModel } from './store/app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Inject()
  storageService: StorageService

  @Get('/')
  async getHello(@Res() res: Response) {
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.end(await this.storageService.readFile('/core-backend/index.html'))
  }

  @Get('/Hello')
  async hello() {
    return await AppModel.find()
  }
}
