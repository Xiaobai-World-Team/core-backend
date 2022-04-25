import { Injectable } from '@nestjs/common';
import { AliyunOssStorageAdapter } from './aliyun-oss.adapter';

export interface IFile {
  /** file name */
  name: string;
  /** full path of this file */
  fullPath: string;
  /** check whether the file is a directory */
  isDirectory: boolean;
  /** last modified of file */
  LastModified: Date;
  /** Content-Length of file*/
  ContentLength: number;
  /** Content-Type of file */
  ContentType: string;
}

@Injectable()
export class StorageService extends AliyunOssStorageAdapter {
  constructor() {
    super();
  }
}
