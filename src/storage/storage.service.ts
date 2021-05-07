import { Injectable } from '@nestjs/common';
import { Stream } from 'node:stream';

abstract class StorageBasic {
  /** create directory */
  abstract mkdir(name: string): Promise<boolean>

  /** move directory or file */
  abstract mv(current: string, target: string): Promise<boolean>

  /** copy directory or file */
  abstract cp(current: string, target: string): Promise<boolean>

  /** create file */
  abstract writeFile(directory: string, fileName: string, data: Buffer | Stream): Promise<boolean>
}

@Injectable()
export class AliyunOssStorageAdapter implements StorageBasic {
  constructor() { }
  async mkdir(name: string) {
    return false
  }
  async mv(current: string, target: string) {
    return false
  }
  async cp(current: string, target: string) {
    return false
  }
  async writeFile(name: string) {
    return false
  }
}

@Injectable()
export class StorageService extends AliyunOssStorageAdapter {
  constructor() {
    super()
  }
}
