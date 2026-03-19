import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Register() {

 const navigate = useNavigate();

 const [form, setForm] = useState({
   email: "",
   password: ""
 });

 const handleSubmit = async (e) => {
   e.preventDefault();

   await api.post("/auth/register", form);

   navigate("/login");
 };

 return (
   <div className="login">

     <form onSubmit={handleSubmit} className="login-form">

       <h2>Register</h2>

       <input
         type="email"
         placeholder="Email"
         onChange={(e) => setForm({ ...form, email: e.target.value })}
       />

       <input
         type="password"
         placeholder="Password"
         onChange={(e) => setForm({ ...form, password: e.target.value })}
       />

       <button type="submit">Sign Up</button>

     </form>

   </div>
 );
}

export default Register;