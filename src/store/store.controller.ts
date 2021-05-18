import { Body, Controller, Get, HttpException, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ObjectId } from 'bson';
import { RegistryModel } from './registory.model';
import { AddGitRegistry } from './store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  @Inject()
  storeService: StoreService
  @Post('addGitRegistry')
  async addGitRegistry(@Body(new ValidationPipe({ transform: true })) body: AddGitRegistry): Promise<{
    code: number
  }> {

    await this.storeService.addGitRegistry(body)

    return {
      code: 0
    }
  }

  @Get('/getGitRegistryList')
  async getGitRegistryList() {
    return await RegistryModel.find()
  }
}
