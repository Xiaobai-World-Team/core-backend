import { Body, Controller, Get, HttpException, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ObjectId } from 'bson';
import { Registry as GitRegistry, RegistryModel } from './registory.model';
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
  async getGitRegistryList(): Promise<{
    code: 0,
    data: GitRegistry[]
  }> {
    return {
      code: 0,
      data: await RegistryModel.find()
    }
  }
}
