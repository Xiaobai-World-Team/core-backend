import { Body, Controller, Get, Inject, Post, Req, Res, Session, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { StoreService, File } from './store.service';
import * as path from 'path'
import { Request, Response } from 'express';
import * as mime from 'mime';
import { extname } from 'path';
import * as zlib from 'zlib';
import { pipeline } from 'stream';
import { App, AppFileItemEnum, AppModel, AppStatus } from './app.model';
import { MinLength } from 'class-validator';
import { UserPrivateSession, UserPublicSession } from 'src/user/user.dto';

class UploadBodyDTO {
  @MinLength(1)
  name: string
  @MinLength(1)
  version: string
  title: string;
  type: 'file' | 'directory'
  baseName: string
  relativePath: string
  buffer: Buffer
  size: Number
}

class CompleteAppEntryDTO {
  @MinLength(1)
  name: string
  @MinLength(1)
  version: string
  title: string;
  jsEntry: string
  css: string[]
  favicon: string
}

@Controller('store')
export class StoreController {
  @Inject()
  storeService: StoreService

  @Inject()
  storeageService: StorageService

  @Get('getAppList')
  async getAppList(
    @Session() session: UserPrivateSession
  ): Promise<{
    data: App[]
  }> {
    return {
      data: await AppModel.find({
        userId: session._id
      })
    }
  }

  @Post('getBasePath')
  getBasePath(
    @Body(new ValidationPipe()) body: UploadBodyDTO,
    @Session() session: UserPrivateSession
  ) {
    console.log('getBasePath', body)
    let path = this.storeService.getAppPath(session._id, body.name, body.version)
    console.log('get base path', path)
    return path
  }

  @Post('cleanTestApp')
  async cleanTestApp(
    @Body(new ValidationPipe()) body: UploadBodyDTO,
    @Session() session: UserPrivateSession
  ) {
    // todo: clean directory
    await AppModel.findOneAndUpdate({
      name: body.name,
      userId: session._id,
      appStatus: AppStatus.TEST
    }, {
      $set: {
        version: body.version,
        fileList: []
      }
    }, {
      upsert: true
    })
  }

  @Post('setTestAppEntry')
  async setTestAppEntry(
    @Body(new ValidationPipe()) body: CompleteAppEntryDTO,
    @Session() session: UserPrivateSession
  ) {
    await AppModel.findOneAndUpdate({
      name: body.name,
      version: body.version,
      userId: session._id,
      appStatus: AppStatus.TEST
    }, {
      $set: {
        title: body.title,
        jsEntry: body.jsEntry,
        css: body.css,
        favicon: body.favicon
      }
    })
  }


  /** todo:change to stream upload */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile('file') file: File, @Body() body: UploadBodyDTO,
    @Session() session: UserPrivateSession
  ) {
    console.log('upload file', body)

    /**
     * "user" id is unique and "name" on this user will be unique and version in "name" will be unique
     */
    const rootPath = this.storeService.getAppPath(session._id, body.name, body.version)
    let diskPath = path.join(rootPath, body.relativePath)
    const extName = path.extname(diskPath).substring(1).toLowerCase()

    if (body.type === 'file') {
      this.storeageService.client.put(diskPath, file.buffer)
    }
    if (body.type === 'directory') {
      diskPath = diskPath + '/'
      this.storeageService.client.put(diskPath, Buffer.from(''))
    }

    // uploaded files will be recored in database
    await AppModel.findOneAndUpdate({
      name: body.name,
      version: body.version,
      userId: session._id,
      // by default, upload file always in test enviroment, only self can visit
      appStatus: AppStatus.TEST
    }, {
      $push: {
        fileList: {
          type: body.type === 'directory' ? AppFileItemEnum.DIRECTORY : AppFileItemEnum.FILE,
          path: diskPath,
          extName,
          size: parseInt(body.size.toString(), 10),
          created: new Date()
        }
      }
    }, { upsert: true })
  }

  /** proxy to oss */
  @Get('/app/**')
  async store(@Req() req: Request, @Res() res: Response) {
    const filePath = req.path;
    const ext = extname(filePath).substring(1).toLowerCase();
    const browserSupportGzip = req.headers['accept-encoding']?.includes('gzip');

    const canGzip = [
      'js',
      'css',
      'json',
      'svg',
      'txt',
      'html',
      'map',
    ].includes(ext);

    if (browserSupportGzip && canGzip) {
      res.setHeader('Content-Encoding', 'gzip');
    }

    const mimeType = mime.getType(ext);
    if (mimeType) {
      res.set('Content-Type', mime.getType(ext));
    }

    let stream = await this.storeageService.client.getStream(filePath);
    if (browserSupportGzip && canGzip) {
      const gzip = zlib.createGzip({
        level: 9,
      });

      pipeline(stream.stream, gzip, res, (err) => {
        if (err) {
          console.error(`compress fail: ${filePath}`);
        }
      });
    } else {
      stream.stream.pipe(res);
    }
  }
}
