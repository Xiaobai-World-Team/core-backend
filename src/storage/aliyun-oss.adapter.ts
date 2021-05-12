import { Injectable } from "@nestjs/common"
import { StorageBasic } from "./storage.types"
import * as OSS from 'ali-oss'

const client = new OSS({
  accessKeyId: process.env.XiaobaiStorageAccessKeyID,
  accessKeySecret: process.env.XiaobaiStorageAccessKeySecret,
  bucket: 'xiaobai-world',
  region: 'oss-cn-hangzhou',
  internal: process.env.OSS_INTERNAL === 'true',
  timeout: '380s'
})


@Injectable()
export class AliyunOssStorageAdapter implements StorageBasic {
  constructor() { }
  /**
   * like windows or macos, use /Users/userA,B,C separate user data,
   * it's the same here,each user can't access other user root path
   */
  get storageRootPath() {
    const userFolderName = (
      Date.now().toString(36) +
      Math.random().toString(36) +
      Math.random().toString(36) +
      Math.random().toString(36) +
      Math.random().toString(36)
    ).replace(/\./g, '').substring(0, 40)
    return `/Users/${userFolderName}`
  }
  async mkdir(name: string): Promise<boolean> {
    // files of size 0 and ending with a slash are considered folders
    const res = await client.put(this.storageRootPath + name + '/', Buffer.from(''))
    return true
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