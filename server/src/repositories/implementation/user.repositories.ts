import { UserModel } from "../../models/user.models";
import { IUser } from "../../types/user.type";
import { IUserInterface } from "../interface/IUserInterface";
// import { HydratedDocument } from "mongoose";
import type { Document, Types } from "mongoose";



export class UserRepository implements IUserInterface {      // Promise<(IUser & Document) | null>
  async findByEmail(email: string): Promise<(IUser & Document) | null> {
    return await UserModel.findOne({ email });
  }

  async createUser(userData: IUser): Promise<(IUser & Document)>{
    const user = new UserModel(userData);
    return await user.save();
  }

  async updatePasswordByEmail(email: string, hashedPassword: string): Promise<void> {
    await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
  }

  // async findById(id: string): Promise<(IUser & Document) | null> {
  // return await UserModel.findById(id);
}


