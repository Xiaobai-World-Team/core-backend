import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "bson";

export class User {

  @prop()
  _id: ObjectId

  /** nick name or real name, anyway */
  @prop({ type: String })
  name: string

  /** email */
  @prop({ type: String })
  email: string;

  /** phone */
  @prop({ type: String })
  phone: string;

  /** create at */
  @prop({ type: Date })
  createdAt: Date
}

export const UserModel = getModelForClass(User)
