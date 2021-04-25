import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Role extends BaseModel {}
export interface RoleModel extends Omit<Role, "_id">, Document {}
export const roleSchema = new Schema<RoleModel>({}, Options);
export const Role: Model<RoleModel> = model(
  uppercaseWords(ControllerEntity.ROLE),
  roleSchema
);
