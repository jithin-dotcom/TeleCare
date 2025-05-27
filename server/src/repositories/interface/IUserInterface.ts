import { UserModel } from "../../models/user.models";
import { IUser } from "../../types/user.type";
import type { Document, Types } from "mongoose";


export interface IUserInterface {
    findByEmail(email : string) : Promise<(IUser & Document) | null>;
    createUser(userData : IUser) : Promise<object>;
    updatePasswordByEmail(email: string, hashedPassword: string): Promise<void>;
}



