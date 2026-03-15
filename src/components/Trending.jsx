import { useEffect, useState } from "react";
import { getTrendingSongs } from "../services/songs.service";

function Trending() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const loadTrendingSongs = async () => {
            const response = await getTrendingSongs();
            setSongs(response.data.data);
        };

        loadTrendingSongs();
    }, []);

    return (
        <div>
            <h2>Trending Songs</h2>
            
                {songs.map((song) => (
                    <div key={song._id}>
                        <p>{song.title} by {song.artist} - Plays: {song.playsCount}, Saves: {song.savesCount}</p>
                    </div>
                ))}
        </div>
    );
}

export default Trending;