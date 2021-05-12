import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { StorageService } from './storage.service';

class readDirDTO {
  @IsString()
  path: string
}


class mkdirDTO {
  @IsString()
  path: string
}

@Controller('storage/fileSystem')
export class StorageController {

  @Inject()
  storageService: StorageService

  @Post('readDir')
  async readDir(@Body() body: readDirDTO) {
    return 'ok'
  }

  @Post('mkDir')
  async mkDir(@Body() body: mkdirDTO) {
    this.storageService.mkdir(body.path)
  }
}
