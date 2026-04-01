import { useState} from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const jwt = res.data.token;

      localStorage.setItem("token", jwt);
      setToken(jwt);
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;