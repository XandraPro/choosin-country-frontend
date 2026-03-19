import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            {/* Landing */}
            <Route path="/" element={<Home />} /> 
            {/* Register */}
            <Route path="/register" element={<Register />} /> 
            {/* Login */}
            <Route path="/login" element={<Login />} /> 
            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
    )
}

export default App;


