import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Stock extends BaseModel {}
export interface StockModel extends Omit<Stock, "_id">, Document {}
export const stockSchema = new Schema<StockModel>({}, Options);
export const Stock: Model<StockModel> = model(
  uppercaseWords(ControllerEntity.STOCK),
  stockSchema
);
