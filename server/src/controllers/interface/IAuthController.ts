import { Request, Response, NextFunction } from "express";

export interface IAuthController {
    signup(req: Request, res: Response, next: NextFunction) : Promise<void>;
    login(req : Request, res: Response, next: NextFunction) : Promise<void>; 
    verifyOtpAndRegister(req: Request, res: Response, next: NextFunction): Promise<void>;
    resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyForgotPasswordOtp(req : Request, res: Response, next: NextFunction): Promise<void>;  
    updateNewPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}