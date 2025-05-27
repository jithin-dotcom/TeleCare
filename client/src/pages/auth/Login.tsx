




// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { toast } from "react-toastify"; // import toast

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       setAuth(res.data);
//       toast.success("Login successful!");
//       navigate("/dashboard", { replace: true });
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-blue-600">Welcome Back 👋</h2>
//           <p className="text-sm text-gray-500 mt-2">Please login to your account</p>
//         </div>

//         {/* Remove inline error display here, toast will handle it */}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="flex justify-between text-sm text-gray-500">
//             <Link to="/forgot-password" className="hover:text-blue-500">Forgot password?</Link>
//             <Link to="/signup" className="hover:text-blue-500">Create account</Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Sign in
//           </button>
//         </form>

//         <div className="flex items-center justify-center space-x-2">
//           <span className="h-px w-full bg-gray-200" />
//           <span className="text-sm text-gray-400">OR</span>
//           <span className="h-px w-full bg-gray-200" />
//         </div>

//         <button
//           type="button"
//           onClick={() => alert("Handle Google login here")}
//           className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
//         >
//           <FcGoogle className="text-xl" />
//           <span className="text-sm">Continue with Google</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      const { accessToken, user } = res.data;

      setAuth({ accessToken, user }); // Save user & token in Zustand

      toast.success("Login successful!");

      // Redirect based on role
      switch (user.role) {
        case "user":
          navigate("/user-dashboard", { replace: true });
          break;
        case "doctor":
          navigate("/doctor-dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin-dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-2">Please login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <Link to="/forgot-password" className="hover:text-blue-500">Forgot password?</Link>
            <Link to="/signup" className="hover:text-blue-500">Create account</Link>
          </div>

          <button
            type="submit"
            disabled = {loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px w-full bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() => alert("Handle Google login here")}
          className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

