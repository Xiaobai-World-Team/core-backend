import { Body, Controller, Get, Inject, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { StoreService, File } from './store.service';
import * as path from 'path'
import { Request, Response } from 'express';
import * as mime from 'mime';
import { extname } from 'path';
import * as zlib from 'zlib';
import { pipeline } from 'stream';
import { AppFileItemEnum, AppModel, AppStatus } from './app.model';


class UploadBodyDTO {
  type: 'file' | 'directory'
  appVersion: string
  appName: string
  baseName: string
  relativePath: string
  buffer: Buffer
  size: Number
}

@Controller('store')
export class StoreController {
  @Inject()
  storeService: StoreService

  @Inject()
  storeageService: StorageService

  // virtual id
  userId = '5274729adf7a7a8b7ccdeeea8'

  @Post('getBasePath')
  getBasePath(@Body() body: UploadBodyDTO) {
    return this.storeService.getAppPath(this.userId, body.appName, body.appVersion)
  }

  @Post('cleanTestApp')
  async cleanTestApp(@Body() body: UploadBodyDTO) {
    await AppModel.findOneAndUpdate({
      appName: body.appName,
      userId: this.userId,
      appStatus: AppStatus.TEST
    }, {
      $set: {
        appVersion: body.appVersion,
        fileList: []
      }
    })
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file: File, @Body() body: UploadBodyDTO) {

    /**
     * user id is unique and appName in user will be unique and version in appName will be unique
     */
    const rootPath = this.storeService.getAppPath(this.userId, body.appName, body.appVersion)
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
      appName: body.appName,
      userId: this.userId,
      // by default, upload file always in test enviroment, only self can visit
      appStatus: AppStatus.TEST
    }, {
      $set: {
        appVersion: body.appVersion
      },
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
