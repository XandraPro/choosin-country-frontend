import { useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const jwt = res.data.token;
      const loggedUser = res.data.user;

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(loggedUser));

      setToken(jwt);
      setUser(loggedUser);
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;