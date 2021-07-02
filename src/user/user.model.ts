import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "bson";

/** User */
export class User {

  @prop()
  _id: ObjectId

  /** email */
  @prop({ type: String })
  email: string;

  /** avatar */
  @prop({ type: String })
  avatar: string;

  @prop({ type: String })
  nickname: string

  /** password */
  @prop({ type: String })
  password: string

  /** salt */
  @prop({ type: String })
  salt: string

  /** create at */
  @prop({ type: Date })
  createdAt: Date
}

export const UserModel = getModelForClass(User)
