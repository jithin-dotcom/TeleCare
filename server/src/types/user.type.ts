// export interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   isVerified?: boolean;
// }


import { ObjectId } from "mongoose";

export interface IUser {
  // _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
  isVerified?: boolean;
  // createdAt?: Date; // add this
  // updatedAt?: Date; // optional, but usually present
}



