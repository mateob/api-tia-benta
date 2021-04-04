import { SchemaOptions } from "mongoose";

export interface BaseModel {
  _id?: string;
  createDate: Date;
  updateDate: Date;
  active: boolean;
}

export const Options: SchemaOptions = {
  toJSON: {
    transform: (_: any, ret: any): void => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};
