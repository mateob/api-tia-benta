import { ControllerEntity } from "@src/controller/base/controller.enum";
import { uppercaseWords } from "@src/util/stringUtils";
import { Document, Model, model, Schema } from "mongoose";
import { BaseModel, Options } from "./base/base.mode";

export interface Category extends BaseModel {
  name: string;
  description: string;
  value: string;
}

export interface CategoryModel extends Omit<Category, "_id">, Document {}
export const categorySchema = new Schema<CategoryModel>(
  {
    name: { type: String },
    description: { type: String },
    value: { type: String },
  },
  Options
);
export const Category: Model<CategoryModel> = model(
  uppercaseWords(ControllerEntity.CATEGORY),
  categorySchema
);
