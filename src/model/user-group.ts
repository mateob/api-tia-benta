import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface UserGroup extends BaseModel {}
export interface UserGroupModel extends Omit<UserGroup, "_id">, Document {}
export const userGroupSchema = new Schema<UserGroupModel>({}, Options);
export const UserGroup: Model<UserGroupModel> = model(
  uppercaseWords(ControllerEntity.USER_GROUP),
  userGroupSchema
);
