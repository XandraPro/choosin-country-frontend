import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { getSongs, createSong} from "../services/songs.service";
import { searchiTunes } from "../services/itunes.service";
import logo from "../assets/logo.png";


function Dashboard() {
    const { logout } = useContext(AuthContext);

    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [itunesResults, setItunesResults] = useState([]);
    const [comment, setComment] = useState("");
    const [error] = useState("");
    

    // Fetch songs on component mount
    useEffect(() => {
         getSongs();
    }, []);

    // Load songs from the backend
    const loadSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };

    // Handle searching for songs on iTunes
    const handleSearchSongs = async () => {
      const results = await searchiTunes(searchTerm);
      setItunesResults(results);
    };

    /*
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
    */
   
    // Handle creating a new song with iTunes search
    const handleCreateSong = async (song) => {
      await createSong({ title: song.trackName, artist: song.artistName, comment });
      setComment("");
      loadSongs();
    };
   
/*
    // Handle updating a song
    const handleUpdateSong = async (id) => {
     try {
        await updateSong(id, { title: editingSongTitle, artist: editingArtist, comment: editingComment });
        setEditingSongId(null); 
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
*/
    return (
        <div style={{ padding: "20px" }}>
          <img src={logo} alt="Choosin' Country Logo" style={{ width: "300px", marginBottom: "20px" }} />
            <h1>Choosin' Country Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <hr />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Search country songs on iTunes</h2>
            <div style={{ marginTop: "20px" }}>
                <input 
                    type="text"
                    placeholder="Search for a song or artist"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button onClick={handleSearchSongs}>Search Song</button>
            </div>

            <div>
              {itunesResults.map((song) => (  
                <div key={song.trackId} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
                  <h3>{song.trackName} - {song.artistName}</h3>
                  <p><strong>Album:</strong> {song.collectionName}</p>
                  <p><strong>Genre:</strong> {song.primaryGenreName}</p>
                  <textarea 
                    placeholder="Add a comment about this song"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ width: "100%", height: "60px", marginTop: "10px" }}
                  />
                  <button onClick={() => handleCreateSong(song)} style={{ marginTop: "10px" }}>Add to My Songs</button>
                </div>
              ))}   
            </div>

            <hr />

            <h2>My Country Songs</h2>
            <div>
              {songs.map((song) => (
                <div key={song._id} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
                  <h3>{song.title} - {song.artist}</h3>
                  <p><strong>Comment:</strong> {song.comment}</p>
                </div>
              ))}   
            </div>
        </div>
    );
}

export default Dashboard;