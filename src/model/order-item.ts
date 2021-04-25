import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface OrderItem extends BaseModel {}
export interface OrderItemModel extends Omit<OrderItem, "_id">, Document {}
export const orderItemSchema = new Schema<OrderItemModel>({}, Options);
export const OrderItem: Model<OrderItemModel> = model(
  uppercaseWords(ControllerEntity.ORDER_ITEM),
  orderItemSchema
);
