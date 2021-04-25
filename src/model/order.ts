import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Order extends BaseModel {}
export interface OrderModel extends Omit<Order, "_id">, Document {}
export const orderSchema = new Schema<OrderModel>({}, Options);
export const Order: Model<OrderModel> = model(
  uppercaseWords(ControllerEntity.ORDER),
  orderSchema
);
