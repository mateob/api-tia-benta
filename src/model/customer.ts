import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Customer extends BaseModel {}
export interface CustomerModel extends Omit<Customer, "_id">, Document {}
export const customerSchema = new Schema<CustomerModel>({}, Options);
export const Customer: Model<CustomerModel> = model(
  uppercaseWords(ControllerEntity.CUSTOMER),
  customerSchema
);
