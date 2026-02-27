// import React, { useState } from "react";
// import logo_j from '../assets/jagadambap_logo.jpg'; // Ensure you have a logo image in the specified path
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     PhoneNumber:'',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     // Basic validation
//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
//       setError('All fields are required');
//       setLoading(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Please enter a valid email address');
//       setLoading(false);
//       return;
//     }

//     // Password validation (minimum 6 characters)
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         'http://localhost:5000/api/auth/register',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (data?.success) {
//         setSuccess(data.message || 'Account created successfully! Please check your email for verification.');
//         // Reset form
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           PhoneNumber:'',
//           password: ''
//         });
//         // Redirect to login after 3 seconds
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       } else {
//         setError(data?.message || 'Registration failed. Please try again.');
//       }
//     } catch (err) {
//       setError('Network error. Please check if the backend server is running.');
//       console.error('Registration error:', err);
//     } finally {
//       setLoading(false);
//     }
//     console.log(formData);
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
//           Create an Account
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
//             {success}
//           </div>
//         )}

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>

//           {/* First Name */}
//           <div>
//             <label className="text-gray-600 text-sm">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//              focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="John"
//               required
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="text-gray-600 text-sm">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//              focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="Doe"
//               required
//             />
//           </div>
//           {/* Phone Number */}
//           <div>
//             <label className="text-gray-600 text-sm">Phone Number</label>
//             <input
//               type="text"
//               name="PhoneNumber"
//               value={formData.PhoneNumber}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//              focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="+977 9812345678"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-gray-600 text-sm">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//              focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-gray-600 text-sm">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
//              focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium
//             hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         {/* Bottom Link */}
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link 
//               to="/login"
//               className="text-orange-600 font-semibold hover:underline bg-transparent border-none cursor-pointer"
//             >
//               Login 
//             </Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Signup;
