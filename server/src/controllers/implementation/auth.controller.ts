

import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/implementation/auth.services";
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  verifyForgotPasswordSchema,
  verifyNewPasswordSchema,
} from "../../validations/auth.schema";
import { IAuthController } from "../interface/IAuthController";

export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = signupSchema.parse(req.body); 
      const data = await this.authService.signup({
        name: validated.name,
        email: validated.email,
        password: validated.password,
        role: validated.role, 
      });
      res.status(200).json(data);
      return;
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      if (error.name === "ZodError") {
         res
          .status(400)
          .json({ message: error.errors.map((e: any) => e.message).join(", ") });
        return;
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const data = await this.authService.login(
        validated.email,
        validated.password
      );
      res.status(200).json(data);
      return;
    } catch (error) {
      next(error);
    }
  }

  async verifyOtpAndRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyOtpSchema.parse(req.body);
      const result = await this.authService.verifyOtpAndRegister(
        validated.email,
        validated.otp
      );
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this.authService.resendOtp(validated.email);
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this.authService.forgotPassword(validated.email);
       res.status(200).json(result);
       return;
    } catch (error) {
      next(error);
    }
  }

  async verifyForgotPasswordOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = verifyOtpSchema.parse(req.body);
      const result = await this.authService.verifyForgotPasswordOtp(
        validated.email,
        validated.otp
      );
       res.status(200).json(result);
       return;
    } catch (error) {
      next(error);
    }
  }

  async updateNewPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = verifyNewPasswordSchema.parse(req.body);
      const result = await this.authService.updateNewPassword(
        validated.email,
        validated.newPassword,
        validated.reenterNewPassword
      );
       res.status(200).json(result);
       return;
    } catch (error) {
      next(error);
    }
  }
   

}


