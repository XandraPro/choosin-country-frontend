import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { getSongs, createSong, updateSong, deleteSong} from "../services/songs.service";


function Dashboard() {
    const { logout } = useContext(AuthContext);

    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState("");
    const [editingSongId, setEditingSongId] = useState(null);   
    const [editingSongTitle, setEditingSongTitle] = useState("");
    const [editingArtist, setEditingArtist] = useState("");
    const [editingComment, setEditingComment] = useState("");
    const [error, setError] = useState("");
    

    // Fetch songs on component mount
    useEffect(() => {
         getSongs();
    }, []);

    const loadSongs = async () => {
        try {
            const response = await getSongs();
            setSongs(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch songs");
        }
    };

    // Handle creating a new song
    const handleCreateSong = async () => {
        if (!newSong) return;
        try {
            await createSong({ title: newSong });
            setNewSong("");
            loadSongs();
        } catch (err) {
            console.error(err);
            setError("Failed to create song");      
        }
    };

    // Handle updating a song
    const handleUpdateSong = async (id) => {
     try {
        await updateSong(id, { title: editingSongTitle, artist: editingArtist, comment: editingComment });
        setEditingSongId(null);
        setEditingSongTitle("");
        setEditingArtist("");
        setEditingComment("");
        loadSongs();
     } catch (err) {
        console.error(err);
        setError("Failed to update song");
     }
    };  

    // Handle deleting a song
    const handleDeleteSong = async (id) => {
        if (!window.confirm("Are you sure you want to delete this song?")) return;
        try {
            await deleteSong(id);
            loadSongs();
        } catch (err) {
            console.error(err);
            setError("Failed to delete song");
        }
    };

    // Handle canceling edit mode
    const handleCancelEdit = () => {
        setEditingSongId(null);
        setEditingSongTitle("");
        setEditingArtist("");
        setEditingComment("");
    };  

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "20px" }}>
                <input 
                    type="text"
                    placeholder="New song title"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                />
                <button onClick={handleCreateSong}>Add Song</button>
            </div>

            <ul style={{ marginTop: "20px" }}>
                {songs.map((song) => (
                    <li key={song._id} style={{ marginBottom: "10px" }}>
                    {editingSongId === song._id ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Song title"
                                value={editingSongTitle}
                                onChange={(e) => setEditingSongTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Artist"
                                value={editingArtist}
                                onChange={(e) => setEditingArtist(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Comment"
                                value={editingComment}
                                onChange={(e) => setEditingComment(e.target.value)}
                            />
                            <button onClick={() => handleUpdateSong(song._id)}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            {song.title} - {song.artist} - {song.comment}
                            <button onClick={() => {
                                setEditingSongId(song._id);
                                setEditingSongTitle(song.title);
                                setEditingArtist(song.artist);
                                setEditingComment(song.comment);
                            }}>Edit</button>
                            <button onClick={() => handleDeleteSong(song._id)}>Delete</button>
                        </div>
                    )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;