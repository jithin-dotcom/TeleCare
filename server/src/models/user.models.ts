// import mongoose, { Schema } from "mongoose";

// const UserSchema = new Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   isVerified: { type: Boolean, default: false },
// }, { timestamps: true });

// export const UserModel = mongoose.model("User", UserSchema);






import mongoose, { Schema, Document,ObjectId } from "mongoose";

import { IUser } from "../types/user.type";
import { object } from "zod";

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



