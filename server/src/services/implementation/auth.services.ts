// import bcrypt from "bcrypt";
// import { UserRepository } from "../../repositories/implementation/user.repositories";
// import { generateTokens } from "../../utils/jwt";
// import { IAuthService } from "../interface/IAuthService";
// import { IUser } from "../../types/user.type";
// import {sendOtpMail} from "../../utils/mailer"
// // import {OtpVerification} from "../../models/otp.models";
// import { OtpRepository } from "../../repositories/implementation/otp.repositories";



// export class AuthService implements IAuthService{
  

//    constructor(
//     private userRepo: UserRepository,
//     private otpRepo: OtpRepository
//   ) {}
  

//    async login(email: string, password: string): Promise<object> {
//      try {
//        const user = await this.userRepo.findByEmail(email);

//        if (!user) {
//           throw new Error("Invalid credentials");
//        }

//        const isMatch = await bcrypt.compare(password, user.password);

//        if (!isMatch) {
//           throw new Error("Invalid credentials");
//        }

//        const tokens = generateTokens({ id: user.name, email: user.email });
//        return { user, ...tokens };
//      }catch (error: unknown) {
//        console.log(error);
//        throw error;
//      }
//   }
 

//   async signup(user: IUser): Promise<{message: string}> {
//       try {
//         const existingUser = await this.userRepo.findByEmail(user.email);
//         // if(existingUser){
//         //   throw new Error("user already exists");
//         // }
//         if(existingUser){
//           const error = new Error("User already exists");
//           (error as any).statusCode = 409;
//           throw error;
//         }
//         const hashedPassword = await bcrypt.hash(user.password,10);
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();

//         await this.otpRepo.createOtp(user.email, otp, {
//            name: user.name,
//            email: user.email,
//            password: hashedPassword
//         });
//         await sendOtpMail(user.email,otp);
//         return {message: "otp send to your email"};
        
//       } catch (error) {
//         console.error("signup error : ",error);
//         throw error;
//       }
//   }


//   async verifyOtpAndRegister(email: string, otp: string) : Promise<object>{
//     try {
//       const otpRecord = await this.otpRepo.findOtp(email);
//       if(!otpRecord){
//         throw new Error("otp expired or not found");
//       }
//       if(otpRecord.otp !== otp){
//         throw new Error("invalid otp");
//       }
//       const createUser = await this.userRepo.createUser(otpRecord.user);
//       await this.otpRepo.deleteOtp(email);
//       const token = generateTokens({id: createUser._id, email: createUser.email});
//       return {user: createUser,...token};
//     } catch (error) {
//       console.error("signup error : ",error);
//       throw error;
//     }
//   }

    
//   async resendOtp(email: string): Promise<{ message: string }> {
//      try {
//        const otpRecord = await this.otpRepo.findOtp(email);
//        if (!otpRecord) {
//          throw new Error("No OTP request found for this email.");
//        }

//        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    
//        await this.otpRepo.createOtp(email, newOtp, otpRecord.user);

//        await sendOtpMail(email, newOtp);
//        return { message: "OTP resent successfully." };
//       }catch (error) {
//        console.error("Resend OTP Error:", error);
//        throw error;
//       }
//   }


//   async forgotPassword(email: string): Promise<{message: string}> {
//       try {
//         if(!email){
//           throw new Error("email is required");
//         }
//         const user = await this.userRepo.findByEmail(email);
//         if(!user){
//           throw new Error("user not found");
//         }
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         await this.otpRepo.createOtp(email, otp, {
//           name: user.name,
//           email: user.email,
//           password: user.password
//         });
//         await sendOtpMail(email,otp);
//         return {message: "otp send to email"};

//       } catch (error) {
//         console.error("send otp error : ",error);
//         throw error;
//       }
//   }

//   async verifyForgotPasswordOtp(email: string, otp: string): Promise<object> {
//     try {
//          const otpRecord = await this.otpRepo.findOtp(email);
//          if(!otpRecord){
//            throw new Error("invalid or expired otp");
//          }
//          if(otpRecord.otp !== otp){
//            throw new Error("otp not matched");
//          }
//         //  await this.otpRepo.deleteOtp(email);
//          return {message: "enter new password"};
//     }catch (error) {
//         console.error("otp verification failed : ",error);
//         throw error;
//     }
//   }

//   async updateNewPassword(email: string, newPassword: string, reenterNewPassword : string): Promise<object> {
//     try {
//       if(!email || !newPassword || !reenterNewPassword){
//         throw new Error("fields are missing");
//       }
//       if(newPassword !== reenterNewPassword){
//         throw new Error("entered passwords not matching");
//       }
//       const otpRecord = await this.otpRepo.findOtp(email);
//       if(!otpRecord){
//          throw new Error("otp verification needed");
//       }
//       const hashedPassword = await bcrypt.hash(newPassword,10);
//       await this.userRepo.updatePasswordByEmail(email, hashedPassword);
//       await this.otpRepo.deleteOtp(email);
//       return {message: "password updated successfully"};

//     }catch (error) {
//        console.error("update password error : ",error);
//        throw error; 
//     }
//   }

// }












import bcrypt from "bcrypt";
import { UserRepository } from "../../repositories/implementation/user.repositories";
import { generateTokens } from "../../utils/jwt";
import { IAuthService } from "../interface/IAuthService";
import { IUser } from "../../types/user.type";
import { sendOtpMail } from "../../utils/mailer";
import { OtpRepository } from "../../repositories/implementation/otp.repositories";

export class AuthService implements IAuthService {
  constructor(
    private userRepo: UserRepository,
    private otpRepo: OtpRepository
  ) {}

  async login(email: string, password: string): Promise<object> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const tokens = generateTokens({
        id: user.name,
        email: user.email,
        role: user.role,
      });

      return { user, ...tokens };
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  }

  async signup(user: IUser): Promise<{ message: string }> {
    try {
      const existingUser = await this.userRepo.findByEmail(user.email);
      if (existingUser) {
        const error = new Error("User already exists");
        (error as any).statusCode = 409;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await this.otpRepo.createOtp(user.email, otp, {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role, // include role
      });

      await sendOtpMail(user.email, otp);
      return { message: "OTP sent to your email" };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async verifyOtpAndRegister(email: string, otp: string): Promise<object> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      const newUser = await this.userRepo.createUser(otpRecord.user);
      await this.otpRepo.deleteOtp(email);

      const tokens = generateTokens({
        id: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });

      return { user: newUser, ...tokens };
    } catch (error) {
      console.error("Verify OTP error:", error);
      throw error;
    }
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("No OTP request found");

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await this.otpRepo.createOtp(email, newOtp, otpRecord.user);
      await sendOtpMail(email, newOtp);

      return { message: "OTP resent successfully" };
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) throw new Error("User not found");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await this.otpRepo.createOtp(email, otp, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      await sendOtpMail(email, otp);
      return { message: "OTP sent to email" };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  async verifyForgotPasswordOtp(email: string, otp: string): Promise<object> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      return { message: "Enter new password" };
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  }

  async updateNewPassword(
    email: string,
    newPassword: string,
    reenterNewPassword: string
  ): Promise<object> {
    try {
      if (!email || !newPassword || !reenterNewPassword)
        throw new Error("Missing fields");

      if (newPassword !== reenterNewPassword)
        throw new Error("Passwords do not match");

      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("OTP verification needed");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepo.updatePasswordByEmail(email, hashedPassword);
      await this.otpRepo.deleteOtp(email);

      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  }
  

  // services/implementation/auth.services.ts

// async getCurrentUser(userId: string) {
//   const user = await this.userRepo.findById(userId);
//   if (!user) throw new Error("User not found");
//   return {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     createdAt: user.createdAt,
//   };
// }


}




