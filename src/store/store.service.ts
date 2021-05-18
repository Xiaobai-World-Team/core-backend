import { HttpException, Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { RegistryModel } from './registory.model';
import { AddGitRegistry } from './store.dto';

@Injectable()
export class StoreService {
  /** 
   * add git registry
   */
  async addGitRegistry(body: AddGitRegistry) {
    if (!/\.git$/i.test(body.gitRegistry)) {
      throw new HttpException('must end with git', 500)
    }

    if (await RegistryModel.exists({
      gitRegistry: body.gitRegistry
    })) {
      throw new HttpException('git registry already exist', 500)
    }

    await RegistryModel.create({
      _id: new ObjectId(),
      gitRegistry: body.gitRegistry
    })
  }
}
