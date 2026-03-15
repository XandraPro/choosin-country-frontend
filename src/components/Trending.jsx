import { useEffect, useState } from "react";
import { getTrendingSongs } from "../services/song.service";

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
            <ul>
                {songs.map((song) => (
                    <li key={song._id}>
                        {song.title} by {song.artist} - Plays: {song.playsCount}, Saves: {song.savesCount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trending;