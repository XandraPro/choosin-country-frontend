import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h2 className="logo">🤠 Country</h2>

      <button onClick={() => navigate("/")}>🏠 Home</button>
      <button onClick={() => navigate("/dashboard")}>🎵 Dashboard</button>
      <button onClick={logout}>🚪 Logout</button>
    </div>
  );
}

export default Sidebar;