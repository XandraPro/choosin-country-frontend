import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            {/* Landing*/}
            <Route path="/" element={<Home />} /> 
            {/* Login*/}
            <Route path="/login" element={<Login />} /> 
            {/* Protected Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
    )
}

export default App;


