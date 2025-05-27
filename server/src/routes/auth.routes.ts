import { Router } from "express";
import { AuthController } from "../controllers/implementation/auth.controller";
import { AuthService } from "../services/implementation/auth.services";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { OtpRepository } from "../repositories/implementation/otp.repositories";


const router = Router();
const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const authService = new AuthService(userRepository, otpRepository);
const authController = new AuthController(authService);

router.post("/signup", authController.signup.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/verify-otp", authController.verifyOtpAndRegister.bind(authController));
router.post("/resend-otp", authController.resendOtp.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));
router.post("/forgotPassword-otp", authController.verifyForgotPasswordOtp.bind(authController));
router.post("/update-password", authController.updateNewPassword.bind(authController));



export default router;
