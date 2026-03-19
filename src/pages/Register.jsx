import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

function Register() {

 const navigate = useNavigate();

 const [form, setForm] = useState({
   email: "",
   password: "",
   confirmPassword: ""
 });

 const [error, setError] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   // 🔴 VALIDACIÓN
   if (form.password !== form.confirmPassword) {
     setError("Passwords do not match");
     return;
   }

   try {
     await api.post("/auth/register", {
       email: form.email,
       password: form.password
     });

     navigate("/login");

   } catch (err) {
     console.error(err);
     setError("Error registering user");
   }
 };

 return (
   <div className="login">

     <form className="login-form" onSubmit={handleSubmit}>

       <h2>Register</h2>

       {error && <p className="error">{error}</p>}

       <input
         type="email"
         placeholder="Email"i
         required
         onChange={(e) =>
           setForm({ ...form, email: e.target.value })
         }
       />

       <input
         type="password"
         placeholder="Password"
         required
         onChange={(e) =>
           setForm({ ...form, password: e.target.value })
         }
       />

       <input
         type="password"
         placeholder="Repeat password"
         required
         onChange={(e) =>
           setForm({ ...form, confirmPassword: e.target.value })
         }
       />

       <button type="submit">
         Sign Up
       </button>

     </form>

   </div>
 );
}

export default Register;