// pages/auth/VerifyForgotPassword.tsx
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const VerifyForgotPassword: React.FC = () => {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();
//   const email = localStorage.getItem("forgotEmail");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return toast.error("Session expired. Start over.");

//     try {
//       await axios.post("/api/auth/forgotPassword-otp", { email, otp });
//       toast.success("OTP verified");
//       navigate("/reset-password");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Verify OTP</h2>
//         <input
//           type="text"
//           className="w-full mb-4 px-4 py-2 border rounded-lg"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Verify</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyForgotPassword;




// pages/auth/VerifyForgotPassword.tsx
// import React, { useState, useEffect, useRef } from "react";
// import axios, { isAxiosError } from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const VerifyForgotPassword: React.FC = () => {
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState<string | null>(null);
//   const [isResending, setIsResending] = useState(false);
//   const navigate = useNavigate();
//   const resendTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const [secondsLeft, setSecondsLeft] = useState(0);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("forgotEmail");
//     if (!storedEmail) {
//       toast.error("Session expired. Please start again.");
//       navigate("/forgot-password");
//       return;
//     }
//     setEmail(storedEmail);
//   }, [navigate]);

//   // Countdown timer for resend OTP button
//   useEffect(() => {
//     if (secondsLeft <= 0) {
//       if (resendTimerRef.current) {
//         clearInterval(resendTimerRef.current);
//         resendTimerRef.current = null;
//       }
//       return;
//     }
//     resendTimerRef.current = setInterval(() => {
//       setSecondsLeft((sec) => sec - 1);
//     }, 1000);
//     return () => {
//       if (resendTimerRef.current) clearInterval(resendTimerRef.current);
//     };
//   }, [secondsLeft]);

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return toast.error("Session expired. Start again.");
//     if (otp.length !== 6) return toast.error("Please enter a 6-digit OTP");

//     try {
//       await axios.post("/api/auth/forgotPassword-otp", { email, otp });
//       toast.success("OTP verified successfully. Please reset your password.");
//       navigate("/reset-password");
//     }catch (err: unknown) {
//        if(isAxiosError(err)){
//          toast.error(err.response?.data?.message || "OTP verification failed");
//        }else{
//          toast.error("something went wrong");
//        }
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!email) return toast.error("Session expired. Start again.");
//     setIsResending(true);
//     try {
//       await axios.post("/api/auth/resend-otp", { email });
//       toast.success("OTP resent successfully.");
//       setSecondsLeft(30); // 30 seconds cooldown for resend
//     }catch (err: unknown) {
//        if(isAxiosError(err)){
//          toast.error(err.response?.data?.message || "Failed to send OTP");
//        }else{
//          toast.error("something went wrong");
//        }

//     }finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
//       <form onSubmit={handleVerify} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Verify OTP</h2>
//         <input
//           type="text"
//           maxLength={6}
//           className="w-full mb-4 px-4 py-2 border rounded-lg text-center text-xl tracking-widest"
//           placeholder="Enter 6-digit OTP"
//           value={otp}
//           onChange={(e) => {
//             const val = e.target.value.replace(/\D/g, ""); // allow digits only
//             setOtp(val);
//           }}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4"
//         >
//           Verify OTP
//         </button>

//         <button
//           type="button"
//           disabled={isResending || secondsLeft > 0}
//           onClick={handleResendOtp}
//           className={`w-full py-2 rounded-lg border ${
//             isResending || secondsLeft > 0
//               ? "border-gray-400 text-gray-400 cursor-not-allowed"
//               : "border-blue-600 text-blue-600 hover:bg-blue-100"
//           }`}
//         >
//           {secondsLeft > 0 ? `Resend OTP in ${secondsLeft}s` : "Resend OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VerifyForgotPassword;




// import React, { useState, useEffect, useRef } from "react";
// import axios, { isAxiosError } from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const VERIFY_DURATION = 60;

// const VerifyForgotPassword: React.FC = () => {
//   const [otp, setOtp] = useState("");
//   const [email, setEmail] = useState<string | null>(null);
//   const [isResending, setIsResending] = useState(false);
//   const [isVerifyEnabled, setIsVerifyEnabled] = useState(true);
//   const [verifyTimer, setVerifyTimer] = useState(VERIFY_DURATION);
//   const navigate = useNavigate();
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("forgotEmail");
//     if (!storedEmail) {
//       toast.error("Session expired. Please start again.");
//       navigate("/forgot-password");
//       return;
//     }
//     setEmail(storedEmail);

//     startVerifyCountdown(); // start timer on load
//   }, [navigate]);

//   const startVerifyCountdown = () => {
//     setIsVerifyEnabled(true);
//     setVerifyTimer(VERIFY_DURATION);
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setVerifyTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current!);
//           setIsVerifyEnabled(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleVerify = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return toast.error("Session expired. Start again.");
//     if (otp.length !== 6) return toast.error("Please enter a 6-digit OTP");
//     if (!isVerifyEnabled) return toast.error("Time expired. Please resend OTP.");

//     try {
//       await axios.post("/api/auth/forgotPassword-otp", { email, otp });
//       toast.success("OTP verified successfully. Please reset your password.");
//       navigate("/reset-password");
//     } catch (err: unknown) {
//       if (isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "OTP verification failed");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!email) return toast.error("Session expired. Start again.");
//     setIsResending(true);
//     try {
//       await axios.post("/api/auth/resend-otp", { email });
//       toast.success("OTP resent successfully.");
//       startVerifyCountdown(); // restart 60s verify timer
//     } catch (err: unknown) {
//       if (isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Failed to send OTP");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
//       <form
//         onSubmit={handleVerify}
//         className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
//       >
//         <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Verify OTP</h2>

//         <input
//           type="text"
//           maxLength={6}
//           className="w-full mb-4 px-4 py-2 border rounded-lg text-center text-xl tracking-widest"
//           placeholder="Enter 6-digit OTP"
//           value={otp}
//           onChange={(e) => {
//             const val = e.target.value.replace(/\D/g, "");
//             setOtp(val);
//           }}
//           required
//         />

//         {/* Verify OTP Button */}
//         <button
//           type="submit"
//           disabled={!isVerifyEnabled}
//           className={`w-full py-2 rounded-lg mb-4 ${
//             isVerifyEnabled
//               ? "bg-blue-600 text-white"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           {isVerifyEnabled
//             ? `Verify OTP (${verifyTimer}s)`
//             : "Verify OTP (Expired)"}
//         </button>

//         {/* Resend OTP Button */}
//         <button
//           type="button"
//           disabled={isVerifyEnabled || isResending}
//           onClick={handleResendOtp}
//           className={`w-full py-2 rounded-lg border ${
//             isVerifyEnabled || isResending
//               ? "border-gray-400 text-gray-400 cursor-not-allowed"
//               : "border-blue-600 text-blue-600 hover:bg-blue-100"
//           }`}
//         >
//           {isResending ? "Resending..." : "Resend OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VerifyForgotPassword;





import React, { useState, useEffect, useRef } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VERIFY_DURATION = 60;
const OTP_FORGOT_KEY = "otp-forgot-timestamp";

const VerifyForgotPassword: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateRemainingTime = () => {
    const sentTime = localStorage.getItem(OTP_FORGOT_KEY);
    if (!sentTime) return VERIFY_DURATION;
    const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
    return Math.max(0, VERIFY_DURATION - elapsed);
  };

  const startVerifyCountdown = (duration: number = VERIFY_DURATION) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let timeLeft = duration;

    setVerifyTimer(timeLeft);
    setIsVerifyEnabled(true);

    timerRef.current = setInterval(() => {
      timeLeft -= 1;
      setVerifyTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerRef.current!);
        setIsVerifyEnabled(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("forgotEmail");
    if (!storedEmail) {
      toast.error("Session expired. Please start again.");
      navigate("/forgot-password");
      return;
    }
    setEmail(storedEmail);

    if (!localStorage.getItem(OTP_FORGOT_KEY)) {
      localStorage.setItem(OTP_FORGOT_KEY, Date.now().toString());
    }

    const remaining = calculateRemainingTime();
    if (remaining > 0) {
      setIsVerifyEnabled(true);
      startVerifyCountdown(remaining);
    }

    setHydrated(true); // prevent flicker
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Session expired. Start again.");
    if (otp.length !== 6) return toast.error("Please enter a 6-digit OTP");
    if (!isVerifyEnabled) return toast.error("Time expired. Please resend OTP.");

    try {
      await axios.post("/api/auth/forgotPassword-otp", { email, otp });
      toast.success("OTP verified successfully. Please reset your password.");
      localStorage.removeItem(OTP_FORGOT_KEY); // Clean up timer
      navigate("/reset-password");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "OTP verification failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) return toast.error("Session expired. Start again.");
    setIsResending(true);
    try {
      await axios.post("/api/auth/resend-otp", { email });
      localStorage.setItem(OTP_FORGOT_KEY, Date.now().toString());
      toast.success("OTP resent successfully.");
      setOtp("");
      startVerifyCountdown();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!hydrated) return null; // avoid flicker

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form
        onSubmit={handleVerify}
        className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Verify OTP</h2>

        <input
          type="text"
          maxLength={6}
          className="w-full mb-4 px-4 py-2 border rounded-lg text-center text-xl tracking-widest"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setOtp(val);
          }}
          required
        />

        {/* Verify OTP Button */}
        <button
          type="submit"
          disabled={!isVerifyEnabled}
          className={`w-full py-2 rounded-lg mb-4 ${
            isVerifyEnabled
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isVerifyEnabled
            ? `Verify OTP (${verifyTimer}s)`
            : "Verify OTP (Expired)"}
        </button>

        {/* Resend OTP Button */}
        <button
          type="button"
          disabled={isVerifyEnabled || isResending}
          onClick={handleResendOtp}
          className={`w-full py-2 rounded-lg border ${
            isVerifyEnabled || isResending
              ? "border-gray-400 text-gray-400 cursor-not-allowed"
              : "border-blue-600 text-blue-600 hover:bg-blue-100"
          }`}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyForgotPassword;
