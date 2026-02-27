// import { useEffect } from "react";
// import { CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const PasswordResetSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/login");
//     }, 3000); // redirect after 3 seconds

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center animate-fade-in">
//         <CheckCircle className="mx-auto text-green-500 w-20 h-20 mb-4 animate-bounce" />

//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Password Reset Successful
//         </h2>

//         <p className="text-gray-600 mb-6">
//           Your password has been updated successfully.
//           <br />
//           Redirecting to login page...
//         </p>

//         <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//           <div className="bg-green-500 h-full animate-progress"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordResetSuccess;
