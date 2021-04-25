import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface CarteItem extends BaseModel {}
export interface CarteItemModel extends Omit<CarteItem, "_id">, Document {}
export const carteItemSchema = new Schema<CarteItemModel>({}, Options);
export const CarteItem: Model<CarteItemModel> = model(
  uppercaseWords(ControllerEntity.CARTE),
  carteItemSchema
);
