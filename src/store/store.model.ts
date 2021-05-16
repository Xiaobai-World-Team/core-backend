import { prop } from "@typegoose/typegoose"

/** description of app, include screenshot or video */
export enum APP_MEDIA_TYPE_ENUM {
  /** screenshot of app */
  PHOTO = 'PHOTO',
  /** feature video of app */
  VIDEO = 'VIDEO'
}

export class APP_MEDIA {
  type: APP_MEDIA_TYPE_ENUM
  url: string
}

/** app history */
export class versionHistory {
  tag: string
  date: Date
}

/** app model */
export class StoreModel {
  /** application name, must global unique */
  @prop({ type: String, trim: true })
  appName: string

  /** github registory, this regostory must be public */
  @prop({ type: String, trim: true })
  github: string

  /** icon, svg is recommended */
  @prop({ type: String, trim: true })
  icon: string

  /** media, include photo or video */
  @prop({ items: APP_MEDIA })
  media: APP_MEDIA[]

  /** latest version */
  @prop({ type: String })
  latestVersion: String

  /** app history */
  @prop({ items: versionHistory })
  versionList: versionHistory[]

  /** created */
  @prop({ type: Date })
  created: Date
}
