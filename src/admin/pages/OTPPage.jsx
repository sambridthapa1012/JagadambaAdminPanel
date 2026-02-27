// import { useState } from "react";
// import { useNavigate,useLocation} from "react-router-dom";



// const OTPPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;
//   const [otp, setOtp] = useState("");
//   const[loading,setLoading]=useState(false);
//   const[resending,setResensing]=useState(false);
//    const ResendOTPHandler = async (e) => {
//     setResensing(true);
//     setTimeout(() => {
//         setResensing(false);      
//     },2000);
//     e.preventDefault();

//     try{
//         const res= await fetch(`http://localhost:5000/api/auth/forgot-password`, {
        
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email}),
//     });
//     const data = await res.json();
//     if (data.success) {
//     alert("OTP resent successfully.");
//     } 
// }catch (error) {
//       console.error("Error sending reset link:", error);
//     }
    


   
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//         setLoading(false);      
//     },2000);
   
//     // const API_URL = "http://localhost:5000";
//     try{
//         const res= await fetch(`http://localhost:5000/api/auth/verify-otp`, {
        
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email,otp}),
//     });
//     const data = await res.json();
//     if (data.success) {
//       navigate(`/reset-password/${data.resetToken}`);
//     }
//     else{
//         alert("Invalid OTP. Please try again.");
        
//     } 
//     } catch (error) {
//       console.error("Error sending reset link:", error);
//     }

   
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
//          OTP Verification
//         </h2>

       

//         <form onSubmit={submitHandler} className="space-y-5">
//           <div>
            
//             <div className="relative">
              
//               <input
//                 type="text"
//                 required
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               />
             
             
//             </div>
//           </div>
//             <a href
//          disabled={resending}
//             onClick={ResendOTPHandler}
//             //className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 disabled:opacity-50"
//           >
//             {resending ? "Resending OTP..." : "Resend OTP"}
//           </a>

//           <button
          
//          disabled={loading}
//             type="submit"
//             className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 disabled:opacity-50"
//           >
//             {loading ? "Verifying OTP..." : "Verify OTP"}
//           </button>
       
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPPage;


