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
        <div className="trending">
            <h2 className="section-title">🔥 Top Trending Country Songs</h2>

            {songs.map(song => (
                <div className="topSongs" key={song._id}>
                    <img src={song.artwork} alt={song.songTitle}/>
                    <div>
                        <p>{song.songTitle}</p>
                        <p>{song.artist}</p>
                    </div>
                    <button onClick={() => setCurrentSong(song)}> ▶️ </button>
                </div>
            ))}
        </div>
    );
}

export default Trending;