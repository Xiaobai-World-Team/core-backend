import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "bson";
import { UserModel } from "src/users/user.model";

/** App of Git registry */
export class Registry {

  @prop({ type: ObjectId })
  _id: ObjectId

  /** git registry url */
  @prop({ type: String })
  gitRegistry: String

  // /** user */
  // @prop({ ref: UserModel })
  // user: ObjectId

  // /** branchs */
  // @prop({ items: String })
  // branchs: string[]

  // /** tags */
  // @prop({ items: String })
  // tags: string[]
}

export const RegistryModel = getModelForClass(Registry)
