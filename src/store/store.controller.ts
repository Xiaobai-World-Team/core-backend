import { Body, Controller, Get, Post } from '@nestjs/common';
import { ObjectId } from 'bson';
import { RegistryModel } from './registory.model';
import { AddGitRegistry } from './store.dto';

@Controller('store')
export class StoreController {
  @Post('addGitRegistry')
  async addGitRegistry(@Body() body: AddGitRegistry) {
    console.log(body)
    await RegistryModel.create({
      _id: new ObjectId(),
      gitRegistry: body.gitRegistry
    })
  }

  @Get('/getGitRegistryList')
  async getGitRegistryList() {
    return await RegistryModel.find()
  }
}
