import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

function AuthProvider({ children }) {

 const [token, setToken] = useState(localStorage.getItem("token") || null);

 // 🔥 Session opened with refresh
 useEffect(() => {
   if (token) {
     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
 }, [token]);

 // 🔐 Login
 const login = async (email, password) => {
   try {
     const res = await api.post("/auth/login", { email, password });

     const jwt = res.data.token;

     // guardar token
     localStorage.setItem("token", jwt);

     // poner header global
     api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

     setToken(jwt);

   } catch (error) {
     console.error("Login error:", error.response?.data || error);
     throw error;
   }
 };

 // 🚪 Logout
 const logout = () => {
   localStorage.removeItem("token");
   delete api.defaults.headers.common["Authorization"];
   setToken(null);
 };

 return (
   <AuthContext.Provider value={{ token, login, logout }}>
     {children}
   </AuthContext.Provider>
 );
}

export default AuthProvider;