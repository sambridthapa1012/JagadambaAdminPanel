// import React, { useState } from "react";
// import logo_j from '../assets/jagadambap_logo.jpg'; // Ensure you have a logo image in the specified path
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { setUser } from "../redux/userSlice";
// import { useDispatch } from "react-redux";


// const Login = () => {
//   const dispatch=useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       if (data?.success) {
//         // Store token in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
        
//         // Redirect to homepage
//         navigate("/");
//         dispatch(setUser(res.data.user))
//         toast.success(res.data.message)
//       } else {
//         setError(data?.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || 
//         "Network error. Please check if the backend server is running."
//       );
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
//         {/* Logo */}
//         <div className="flex flex-col items-center mb-6">
//           <img 
//             src={logo_j} 
//             alt="Nepal Hardware Logo" 
//             className="w-25 h-20 mb-2"
//           />
          
//         </div>

//         {/* Title */}
//         <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//           Login to your account
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="text-gray-600 text-sm">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//                          focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-gray-600 text-sm">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//                          focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium
//                        hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Bottom Links */}
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
//               Create one
//             </Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// //import logo_j from "../assets/jagadambap_logo.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await login(formData);

//       if (res.success) {
//         navigate("/admin"); // redirect after login
//       } else {
//         setError(res.message || "Login failed");
//       }
//     } catch (error) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
//         {/* Logo */}
//         {/* <div className="flex flex-col items-center mb-6">
//           <img src={logo_j} alt="Logo" className="w-25 h-20 mb-2" />
//         </div> */}

//         <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
//           Login to your account
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
//             {error}
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="text-gray-600 text-sm">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-gray-600 text-sm">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>
//                       {/* <p className="text-sm text-right">
//   <Link to="/forgot-password" className="text-orange-600 hover:underline">
//     Forgot password?
//   </Link>
// </p> */}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
//               Create one
//             </Link>
//           </p>
   
//         </div> */}

//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (res.success) {
      navigate("/admin");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border-t-4 border-orange-500">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Hardware Admin Panel
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Secure Login Access
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded"></div>
        </div>

        <form onSubmit={submit} className="space-y-5">

          {/* Email */}
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
          >
            Login to Dashboard
          </button>

        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Authorized Personnel Only
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;