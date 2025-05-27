
import mongoose, { Schema, Document,ObjectId } from "mongoose";

import { IUser } from "../types/user.type";


export interface  IUserDocument extends IUser,Document {};

const UserSchema = new Schema<IUserDocument>(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,required: true },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);



