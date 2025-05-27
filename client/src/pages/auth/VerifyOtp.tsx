

// const VerifyOtp = () => {
//   return (
//     <div className="py-30 min-h-screen bg-blue-50">
//       <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-blue-600">Verify OTP</h2>
//           <p className="text-sm text-gray-500 mt-2">Enter the OTP sent to your email</p>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1"></label>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Verify OTP
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600">
//           Didn't get it? <button className=" hover:text-blue-500">Resend</button>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default VerifyOtp






// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuthStore } from "../../store/authStore";

// const VerifyOtp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = (location.state as { email?: string })?.email || "";
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const setAuth = useAuthStore((state) => state.setAuth);

//   if (!email) {
//     // if email is not passed in location state, redirect back to signup
//     navigate("/signup");
//     return null;
//   }

//   const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/verify-otp", { email, otp });
//       setAuth(res.data); // login success
//       navigate("/dashboard"); // redirect to dashboard or home page
//     } catch (err: unknown) {
//       console.error("OTP verification error:", err);
//       if (axios.isAxiosError(err)) {
//         alert("Invalid or expired OTP. " + (err.response?.data?.message || err.message));
//       } else if (err instanceof Error) {
//         alert("Invalid or expired OTP. " + err.message);
//       } else {
//         alert("Invalid or expired OTP. Unknown error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-blue-600">Verify your email</h2>
//           <p className="text-sm text-gray-500 mt-2">We sent an OTP to {email}</p>
//         </div>

//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter the 6-digit code"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
//           >
//             {loading ? "Verifying..." : "Verify & Complete Signup"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;




// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios, { isAxiosError } from "axios";
// import { useAuthStore } from "../../store/authStore";
// import { toast } from "react-toastify";

// const VERIFY_DURATION = 60;

// const VerifyOtp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = (location.state as { email?: string })?.email || "";
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isVerifyEnabled, setIsVerifyEnabled] = useState(true);
//   const [verifyTimer, setVerifyTimer] = useState(VERIFY_DURATION);
//   const [isResending, setIsResending] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const setAuth = useAuthStore((state) => state.setAuth);

//   // Redirect if no email is passed
//   useEffect(() => {
//     if (!email) {
//       navigate("/signup");
//       return;
//     }
//     startVerifyCountdown(); // start 60s timer
//   }, [email, navigate]);

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

//   const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!isVerifyEnabled) {
//       // alert("OTP expired. Please resend OTP.");
//       toast.error("OTP expired. Please resend OTP")
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/verify-otp", { email, otp });
//       setAuth(res.data); // login success
//       navigate("/dashboard");
//     } catch (err: unknown) {
//       if (isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Invalid or expired OTP" );
//       } else{
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setIsResending(true);
//     try {
//       await axios.post("/api/auth/resend-otp", { email });
//       toast.success("OTP send successfully");
//       setOtp("");
//       startVerifyCountdown();
//     } catch (err: unknown) {
//       // alert("Failed to resend OTP.");
//       if(isAxiosError(err)){
//         toast.error(err.response?.data?.message || "Failed to send OTP");
//       }else{
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-blue-600">Verify your email</h2>
//           <p className="text-sm text-gray-500 mt-2">We sent an OTP to {email}</p>
//         </div>

//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
//             <input
//               type="text"
//               name="otp"
//               maxLength={6}
//               placeholder="Enter the 6-digit code"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-wider"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//               required
//             />
//           </div>

//           {/* Verify Button */}
//           <button
//             type="submit"
//             disabled={loading || !isVerifyEnabled}
//             className={`w-full py-2 rounded-lg transition duration-200 ${
//               isVerifyEnabled
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {loading
//               ? "Verifying..."
//               : isVerifyEnabled
//               ? `Verify & Complete Signup (${verifyTimer}s)`
//               : "Verify Expired"}
//           </button>

//           {/* Resend Button */}
//           <button
//             type="button"
//             disabled={isVerifyEnabled || isResending}
//             onClick={handleResendOtp}
//             className={`w-full py-2 rounded-lg border ${
//               isVerifyEnabled || isResending
//                 ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                 : "border-blue-600 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             {isResending ? "Resending..." : "Resend OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;





// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios, { isAxiosError } from "axios";
// import { useAuthStore } from "../../store/authStore";
// import { toast } from "react-toastify";

// const VERIFY_DURATION = 60; // in seconds
// const OTP_SENT_KEY = "otpSentTime";

// const VerifyOtp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = (location.state as { email?: string })?.email || "";
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isVerifyEnabled, setIsVerifyEnabled] = useState(true);
//   const [verifyTimer, setVerifyTimer] = useState(VERIFY_DURATION);
//   const [isResending, setIsResending] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const setAuth = useAuthStore((state) => state.setAuth);

//   // Calculate remaining time from localStorage
//   const calculateRemainingTime = () => {
//     const sentTime = localStorage.getItem(OTP_SENT_KEY);
//     if (!sentTime) return VERIFY_DURATION;
//     const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
//     return Math.max(0, VERIFY_DURATION - elapsed);
//   };

//   useEffect(() => {
//     if (!email) {
//       navigate("/signup");
//       return;
//     }

//     if (!localStorage.getItem(OTP_SENT_KEY)) {
//     localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
//   }

//     const remaining = calculateRemainingTime();
//     if (remaining > 0) {
//       setIsVerifyEnabled(true);
//       setVerifyTimer(remaining);
//       startVerifyCountdown(remaining);
//     } else {
//       setIsVerifyEnabled(false);
//       setVerifyTimer(0);
//     }
//   }, [email, navigate]);

//   const startVerifyCountdown = (duration: number = VERIFY_DURATION) => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     let timeLeft = duration;

//     timerRef.current = setInterval(() => {
//       timeLeft -= 1;
//       setVerifyTimer(timeLeft);

//       if (timeLeft <= 0) {
//         clearInterval(timerRef.current!);
//         setIsVerifyEnabled(false);
//       }
//     }, 1000);
//   };

//   const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!isVerifyEnabled) {
//       alert("OTP expired. Please resend OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/verify-otp", { email, otp });
//       setAuth(res.data); // Save auth state
//       localStorage.removeItem(OTP_SENT_KEY); // Clean up
//       navigate("/dashboard");
//     } catch (err: unknown) {
//       if (isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Invalid or expired OTP");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setIsResending(true);
//     try {
//       await axios.post("/api/auth/resend-otp", { email });
//       toast.success("OTP sent successfully");

//       // Reset logic
//       setOtp("");
//       localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
//       setIsVerifyEnabled(true);
//       setVerifyTimer(VERIFY_DURATION);
//       startVerifyCountdown(VERIFY_DURATION);
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
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-blue-600">Verify your email</h2>
//           <p className="text-sm text-gray-500 mt-2">We sent an OTP to {email}</p>
//         </div>

//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
//             <input
//               type="text"
//               name="otp"
//               maxLength={6}
//               placeholder="Enter the 6-digit code"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-wider"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !isVerifyEnabled}
//             className={`w-full py-2 rounded-lg transition duration-200 ${
//               isVerifyEnabled
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {loading
//               ? "Verifying..."
//               : isVerifyEnabled
//               ? `Verify & Complete Signup (${verifyTimer}s)`
//               : "Verify Expired"}
//           </button>

//           <button
//             type="button"
//             disabled={isVerifyEnabled || isResending}
//             onClick={handleResendOtp}
//             className={`w-full py-2 rounded-lg border ${
//               isVerifyEnabled || isResending
//                 ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                 : "border-blue-600 text-blue-600 hover:bg-blue-100"
//             }`}
//           >
//             {isResending ? "Resending..." : "Resend OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;




import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const VERIFY_DURATION = 60; // in seconds
const OTP_SENT_KEY = "otp-sent-timestamp";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  // Calculate remaining time based on timestamp saved in localStorage
  const calculateRemainingTime = () => {
    const sentTime = localStorage.getItem(OTP_SENT_KEY);
    if (!sentTime) return VERIFY_DURATION;
    const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
    return Math.max(0, VERIFY_DURATION - elapsed);
  };

  // Start countdown with remaining or full duration
  const startVerifyCountdown = (duration: number = VERIFY_DURATION) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let timeLeft = duration;

    setVerifyTimer(timeLeft); // initial render

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
    if (!email) {
      navigate("/signup");
      return;
    }

    // If no timestamp exists, store the current time
    if (!localStorage.getItem(OTP_SENT_KEY)) {
      localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
    }

    const remaining = calculateRemainingTime();
    if (remaining > 0) {
      setIsVerifyEnabled(true);
      startVerifyCountdown(remaining);
    } else {
      setIsVerifyEnabled(false);
    }

    setHydrated(true); // prevent flicker
  }, [email, navigate]);

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerifyEnabled) {
      toast.warning("OTP expired. Please resend OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setAuth(res.data); // Save user and token to Zustand
      localStorage.removeItem(OTP_SENT_KEY); // Clean up timer
      navigate("/dashboard");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid or expired OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await axios.post("/api/auth/resend-otp", { email });
      localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
      toast.success("OTP sent successfully");
      setOtp("");
      setIsVerifyEnabled(true);
      startVerifyCountdown();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to resend OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!hydrated) return null; // prevent flicker

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Verify your email</h2>
          <p className="text-sm text-gray-500 mt-2">We sent an OTP to <strong>{email}</strong></p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="Enter the 6-digit code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-wider"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || !isVerifyEnabled}
            className={`w-full py-2 rounded-lg transition duration-200 ${
              isVerifyEnabled
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Verifying..."
              : isVerifyEnabled
              ? `Verify & Complete Signup (${verifyTimer}s)`
              : "Verify Expired"}
          </button>

          {/* Resend Button */}
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
    </div>
  );
};

export default VerifyOtp;
