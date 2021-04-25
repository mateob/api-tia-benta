import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Config extends BaseModel {}
export interface ConfigModel extends Omit<Config, "_id">, Document {}
export const configSchema = new Schema<ConfigModel>({}, Options);
export const Config: Model<ConfigModel> = model(
  uppercaseWords(ControllerEntity.CONFIG),
  configSchema
);
