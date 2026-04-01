import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css"

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password)
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input type="email" name="email" placeholder="Email" onChange={(e) => (setFormData({ ...formData, email: e.target.value }))} />
        <input type="password" name="password" placeholder="Password" onChange={(e) => (setFormData({ ...formData, password: e.target.value }))} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;