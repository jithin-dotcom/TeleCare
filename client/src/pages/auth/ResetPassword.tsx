
// import { Link } from "react-router-dom"

// const ResetPassword = () => {
//   return (
//      <div className="py-24 min-h-screen bg-blue-50">
//       <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-blue-600">Reset Password</h2>
//           <p className="text-sm text-gray-500 mt-2">Enter and confirm your new password</p>
//         </div>

//         <form className="space-y-4">
//           <div>
//             <label className="block text-md font-medium text-gray-700 mb-1">New Password</label>
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-md font-medium text-gray-700 mb-1">Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Reset Password
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600">
//           Back to{' '}
//           <Link to="/login" className=" hover:text-blue-500">Login</Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default ResetPassword






// pages/auth/ResetPassword.tsx
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ResetPassword: React.FC = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [reenterPassword, setReenterPassword] = useState("");
//   const email = localStorage.getItem("forgotEmail");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return toast.error("Session expired. Start again.");
//     if (newPassword !== reenterPassword) return toast.error("Passwords do not match.");

//     try {
//       await axios.post("/api/auth/update-password", {
//         email,
//         newPassword,
//         reenterNewPassword: reenterPassword,
//       });
//       toast.success("Password updated successfully");
//       localStorage.removeItem("forgotEmail");
//       navigate("/login");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to update password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Reset Password</h2>
//         <input
//           type="password"
//           className="w-full mb-4 px-4 py-2 border rounded-lg"
//           placeholder="New password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="w-full mb-4 px-4 py-2 border rounded-lg"
//           placeholder="Re-enter new password"
//           value={reenterPassword}
//           onChange={(e) => setReenterPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;





// pages/auth/ResetPassword.tsx
import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60", "#2c3e50"];

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const email = localStorage.getItem("forgotEmail");
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordScore(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Session expired. Start again.");
    if (newPassword !== reenterPassword) return toast.error("Passwords do not match.");
    if (passwordScore < 3) return toast.error("Password is too weak.");

    try {
      await axios.post("/api/auth/update-password", {
        email,
        newPassword,
        reenterNewPassword: reenterPassword,
      });
      toast.success("Password updated successfully");
      localStorage.removeItem("forgotEmail");
      navigate("/login");
    }catch (err: unknown) {
      // toast.error(err.response?.data?.message || "Failed to update password");
       if(isAxiosError(err)){
         toast.error(err.response?.data?.message || "Failed to update password");
       }else{
         toast.error("Something went wrong");
       }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Reset Password</h2>
        <input
          type="password"
          className="w-full mb-1 px-4 py-2 border rounded-lg"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <div className="mb-4 h-2 rounded bg-gray-200">
          <div
            style={{
              width: `${(passwordScore / 5) * 100}%`,
              backgroundColor: strengthColors[passwordScore],
              height: "100%",
              borderRadius: "inherit",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p className="mb-4 text-sm" style={{ color: strengthColors[passwordScore] }}>
          {strengthLabels[passwordScore]}
        </p>

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Re-enter new password"
          value={reenterPassword}
          onChange={(e) => setReenterPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
