import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { loginUser } from "../services/auth.service";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div>
    <h1>Login</h1>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;