// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Lock, Eye, EyeOff } from "lucide-react";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validatePassword = () => {
//     if (password.length < 8) {
//       return "Password must be at least 8 characters long";
//     }
//     if (password !== confirmPassword) {
//       return "Passwords do not match";
//     }
//     return "";
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const validationError = validatePassword();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/auth/reset-password/${token}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password, confirmPassword }),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         navigate("/password-reset-success");
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
//           Reset Password
//         </h2>

//         <p className="text-sm text-gray-600 text-center mb-6">
//           Create a strong new password
//         </p>

//         {error && (
//           <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={submitHandler} className="space-y-5">
//           {/* New Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Minimum 8 characters"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3.5 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Re-enter password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//                 className="absolute right-3 top-3.5 text-gray-400"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff size={20} />
//                 ) : (
//                   <Eye size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
//           >
//             {loading ? "Resetting Password..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
