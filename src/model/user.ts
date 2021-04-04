import logger from "@src/logger";
import AuthService from "@src/service/auth.service";
import { model, Schema, Model, models, Document } from "mongoose";
import { BaseModel } from "./base/base.mode";

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = "DUPLICATED",
}

export const schema = new Schema<UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "Email must  be unique"],
    },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export interface UserModel extends Omit<User, "_id">, Document {}

schema.path("email").validate(
  async (email: string) => {
    const emailCount = await models.User.countDocuments({ email });
    return !emailCount;
  },
  "already exists in the database.",
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<UserModel>("save", async function (): Promise<void> {
  if (!this.password || !this.isModified("password")) {
    return;
  }
  try {
    const hashedPassword = await AuthService.hashPassword(this.password);
    this.password = hashedPassword;
  } catch (error) {
    logger.error(`Error hashing the password from the user ${this.name}`);
  }
});

export const User: Model<UserModel> = model("User", schema);
