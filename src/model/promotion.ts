import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Promotion extends BaseModel {}
export interface PromotionModel extends Omit<Promotion, "_id">, Document {}
export const promotionSchema = new Schema<PromotionModel>({}, Options);
export const Promotion: Model<PromotionModel> = model(
  uppercaseWords(ControllerEntity.PROMOTION),
  promotionSchema
);
