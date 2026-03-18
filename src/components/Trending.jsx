import { useEffect, useState } from "react";
import { getTrendingSongs } from "../services/songs.service";

function Trending( {setCurrentSong} ) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const load = async () => {
            const response = await getTrendingSongs();
            setSongs(response.data.data);
        };

        load();
    }, []);

    return (
        <div>
            <h2 className="section-title">🔥 Top Trending Country Songs</h2>

            {songs.map(song => (
                <div className="topSongs" key={song.id}>
                    <img src={song.artwork} />
                    <div>
                        <p>{song.title}</p>
                        <p>{song.artist}</p>
                    </div>
                    <button onClick={() => setCurrentSong(song)}> ▶️ </button>
                </div>
            ))}
        </div>
    );
}

export default Trending;