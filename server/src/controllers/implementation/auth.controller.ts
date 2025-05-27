// import { Request, Response,NextFunction } from "express";
// import { AuthService } from "../../services/implementation/auth.services";
// import { signupSchema, loginSchema, verifyOtpSchema, verifyForgotPasswordSchema, verifyNewPasswordSchema } from "../../validations/auth.schema";
// import { IAuthController } from "../interface/IAuthController";

// export class AuthController implements IAuthController {

//   constructor(private authService : AuthService){};

//   async signup(req: Request, res: Response, next: NextFunction) {
    
//     try {
//       const validate = signupSchema.parse(req.body);
//       const data = await this.authService.signup({
//                       name: validate.name,
//                       email: validate.email,
//                       password: validate.password
//       });
//       res.status(200).json(data);
//     }catch (error: any) {
//        if(error?.statusCode){
//            res.status(error.statusCode).json({message: error.message});
//            return;
//        }
//        if(error.name === "ZodError"){
//           res.status(400).json({message: error.error.map((e:any)=>e.message).join(", ")});
//        }
//        next(error);
//     }
//   }

//   async login(req: Request, res: Response, next: NextFunction) {
//     const validated = loginSchema.parse(req.body);
//     const data = await this.authService.login(validated.email, validated.password);
//     res.status(200).json(data);
//   }

//   async verifyOtpAndRegister(req: Request, res: Response, next: NextFunction) {
//     try {
//       const validate = verifyOtpSchema.parse(req.body);
//       const result = await this.authService.verifyOtpAndRegister(validate.email,validate.otp);
//       res.status(200).json(result);
//     } catch (error) {
//       next(error);
//     }
//   }

//   async resendOtp(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { email } = req.body;
//       if (!email) {
//         res.status(400).json({ message: "Email is required" });
//       }
//       const validate = verifyForgotPasswordSchema.parse(req.body);
//       const result = await this.authService.resendOtp(validate.email);
//       res.status(200).json(result);
//     } catch (error) {
//       next(error);
//     }
//   }

//   async forgotPassword(req: Request, res: Response, next: NextFunction) {
//     try {
//        const {email} = req.body;
//        if(!email){
//           res.status(400).json({ message: "email is required"});
//        }
//        const validate = verifyForgotPasswordSchema.parse(req.body);
//        const result = await this.authService.forgotPassword(validate.email);
//        res.status(200).json(result);

//     } catch (error) {
//        next(error);
//     }
//   }

//   async verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
//       try {
//          const {email, otp} = req.body;
//          if(!email || !otp){
//            res.status(400).json({message: "email or otp missing"});
//          }
//          const validate = verifyOtpSchema.parse(req.body);
//          const result = await this.authService.verifyForgotPasswordOtp(validate.email,validate.otp);
//          res.status(200).json(result);

//       } catch (error) {
//          next(error);
//       }
//   }


//   async updateNewPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
//      try {
//         const {email, newPassword, reenterNewPassword} = req.body;
//         if(!email || !newPassword || !reenterNewPassword){
//            res.status(400).json({message: "fields are missing"});
//         }
//         const validate = verifyNewPasswordSchema.parse(req.body);
//         const result = await this.authService.updateNewPassword(validate.email, validate.newPassword, validate.reenterNewPassword);
//         res.status(200).json(result);

//      }catch (error) {
//         next(error);  
//      }
//   }



// }






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
      const validated = signupSchema.parse(req.body); // Now expects `role` too
      const data = await this.authService.signup({
        name: validated.name,
        email: validated.email,
        password: validated.password,
        role: validated.role, // Include role
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
   
  //  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const userId = (req as any).user?.id; // added by JWT middleware

  //     if (!userId) {
  //        res.status(401).json({ message: "Unauthorized" });
  //        return;
  //     }

  //     const user = await this.authService.getCurrentUser(userId);

  //     if (!user) {
  //        res.status(404).json({ message: "User not found" });
  //        return;
  //     }

  //     res.status(200).json({ user });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

}


