import { BaseModel, Options } from "./base/base.mode";
import { Document, Model, model, Schema } from "mongoose";
import { uppercaseWords } from "@src/util/stringUtils";
import { ControllerEntity } from "@src/controller/base/controller.enum";

export interface Notification extends BaseModel {}
export interface NotificationModel
  extends Omit<Notification, "_id">,
    Document {}
export const notificationSchema = new Schema<NotificationModel>({}, Options);
export const Notification: Model<NotificationModel> = model(
  uppercaseWords(ControllerEntity.NOTIFICATION),
  notificationSchema
);
