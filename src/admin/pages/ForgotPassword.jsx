import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
    // const API_URL = "http://localhost:5000";

  const [email, setEmail] = useState("");
  const[loading,setLoading]=useState(false);
    const navigate = useNavigate();


  const submitHandler = async (e) => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);      
    },2000);
    e.preventDefault();

    try{
        const res= await fetch(`https://jagadamba-backend-cdzs.vercel.app/api/auth/forgot-password`, {
        
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email}),
    });
    const data = await res.json();
    if (data.success) {
    navigate("/otp-page", { state: { email } });
    } 
}catch (error) {
      console.error("Error sending reset link:", error);
    }
    


   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your registered email and we’ll send you a reset link
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
             
             
            </div>
          </div>

          <button
         
          
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 disabled:opacity-50"
             disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
