import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Carte extends BaseModel {
  value: String;
}
export interface CarteModel extends Omit<Carte, "_id">, Document {}
export const carteSchema = new Schema<CarteModel>(
  {
    value: { type: String },
  },
  Options
);
export const Carte: Model<CarteModel> = model(
  uppercaseWords(ControllerEntity.CARTE),
  carteSchema
);
