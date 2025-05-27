import {IUser} from '../../types/user.type'

export interface IAuthService{
     signup(user: IUser): Promise<object>; 
     login(email: string,password:string): Promise<object>;
     verifyOtpAndRegister(email: string, otp: string): Promise<object>;
     resendOtp(email: string): Promise<object>;
     forgotPassword(email: string): Promise<object>;
     verifyForgotPasswordOtp(email: string, otp: string): Promise<object>;
     updateNewPassword(email: string, newPassword: string, reenterNewPassword: string): Promise<object>;
}