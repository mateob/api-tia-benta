import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Recipe extends BaseModel {}
export interface RecipeModel extends Omit<Recipe, "_id">, Document {}
export const recipeSchema = new Schema<RecipeModel>({}, Options);
export const Recipe: Model<RecipeModel> = model(
  uppercaseWords(ControllerEntity.RECIPE),
  recipeSchema
);
