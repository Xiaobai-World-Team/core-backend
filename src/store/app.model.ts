import { getModelForClass, prop } from "@typegoose/typegoose"

/** file type enum */
export enum AppFileItemEnum {
  FILE = 'FILE',
  DIRECTORY = "DIRECTORY"
}

/** app status */
export enum AppStatus {
  PRODUCTION = 'PRODUCTION',
  TEST = "TEST"
}

class FileItem {
  /** file type */
  @prop({ enum: AppFileItemEnum })
  type: AppFileItemEnum

  /** file on "disk" path */
  @prop({ type: String })
  path: string

  /** extname of file */
  @prop({ type: String })
  extName: string

  /** size of file */
  @prop({ type: Number })
  size: number

  /** created of file */
  @prop({ type: Date })
  created: Date
}

/** app model */
export class App {
  /** app name */
  @prop({ type: String, trim: true })
  appName: string

  /** todo: change to ObjectId */
  @prop({ type: String, trim: true })
  userId: String

  /** app version */
  @prop({ type: String, trim: true })
  appVersion: string

  /** app status */
  @prop({ enum: AppStatus })
  appStatus: AppStatus

  @prop({ items: FileItem })
  fileList: FileItem[]

  /** created */
  @prop({ type: Date })
  created: Date
}

export const AppModel = getModelForClass(App)
