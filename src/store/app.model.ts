import { getModelForClass, prop } from '@typegoose/typegoose';

/** file type enum */
export enum AppFileItemEnum {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

/** app status */
export enum AppStatus {
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

class FileItem {
  /** file type */
  @prop({ enum: AppFileItemEnum })
  type: AppFileItemEnum;

  /** file on "disk" path */
  @prop({ type: String })
  path: string;

  /** extname of file */
  @prop({ type: String })
  extName: string;

  /** size of file */
  @prop({ type: Number })
  size: number;

  /** created of file */
  @prop({ type: Date })
  created: Date;
}

/** app model */
export class App {
  /** name */
  @prop({ type: String, trim: true })
  name: string;

  /** title */
  @prop({ type: String, trim: true })
  title: string;

  /** todo: change to ObjectId */
  @prop({ type: String, trim: true })
  userId: string;

  /** app version */
  @prop({ type: String, trim: true })
  version: string;

  /** app root path */
  @prop({ type: String })
  appRootPath: string;

  /** js Entry */
  @prop({ type: String })
  jsEntry: string;

  /** css */
  @prop({ items: String })
  css: string[];

  /** favicon */
  @prop({ type: String })
  favicon: string;

  /** app status */
  @prop({ enum: AppStatus })
  appStatus: AppStatus;

  @prop({ items: FileItem })
  fileList: FileItem[];

  /** the initial width of the window when the application is runing */
  @prop({ type: Number })
  initialWidth: number;

  /** the initial height of the window when the application is runing */
  @prop({ type: Number })
  initialHeight: number;

  /** created */
  @prop({ type: Date })
  created: Date;
}

export const AppModel = getModelForClass(App);
