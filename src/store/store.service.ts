import { Inject, Injectable } from '@nestjs/common';
import { createHash } from 'crypto'
import { StorageService } from 'src/storage/storage.service';
import path from 'path'

export interface File {
  filedname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}


@Injectable()
export class StoreService {


  @Inject()
  storeageService: StorageService

  /** get app path of app */
  getAppPath(userId: string, name: string, version: string) {

    if (!name || !version) {
      throw new Error('name and version must be a string')
    }

    name = name.trim()
    version = version.trim()

    const hash = createHash(`sha256`)
    // make a little confusion 
    const str = `${userId.replace(/(\w)(\w)/g, '$2^_^$1')}${name.split('').join(version)}${version.split('').join(name)}`
    hash.update(str)
    const hex = hash.digest('hex');
    // all app data of user saved into below path 
    const path = `/store/app/user/${userId}/${hex}`
    return path
  }

}
