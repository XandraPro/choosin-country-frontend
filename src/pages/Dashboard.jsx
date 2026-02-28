import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { getSongs } from "../services/songs.service";

function Dashboard() {
    const { logout } = useContext(AuthContext);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const data = await getSongs();
                setSongs(data.data);
            } catch (err) {
                console.error("Error fetching songs:", err);
                setError("Failed to fetch songs. Please try again.");
            }
        };

        fetchSongs();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>{songs.map((song) => {
                <li key={song._id}>{song.title}</li>
            })}
            </ul>
        </div>
    );
}

export default Dashboard;