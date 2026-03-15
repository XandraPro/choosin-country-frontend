import { useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios"

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        const jwt = res.data.token;
        localStorage.setItem("token", jwt)
        api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        setToken(jwt);
    };
    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;