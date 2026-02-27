import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ Create context
export const AuthContext = createContext();

// ✅ Axios instance
const API = axios.create({
  baseURL: "https://jagadamba-backend-cdzs.vercel.app/api",
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔐 Login
  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);

    if (res.data.success) {
      localStorage.setItem("token", res.data.data.token);
      setUser(res.data.data.user);
    }

    return res.data;
  };

  // 👤 Get logged-in user
  const getMe = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token: localStorage.getItem("token"),
        isAuthenticated: !!user,
        login,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
