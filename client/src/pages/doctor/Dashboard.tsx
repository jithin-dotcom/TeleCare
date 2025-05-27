

// const Dashboard = () => {
//   return (
//     <div>
//         <h1 className="text-3xl font-bold underline">
//             Doctor Dashboard
//         </h1>
//     </div>
//   )
// }

// export default Dashboard











import React from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome, doctor {user?.name || "User"}!</h1>
      <p>Your email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
