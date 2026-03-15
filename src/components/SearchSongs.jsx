import { useState } from "react";
import { searchSongs } from "../services/itunes.service";
import SongCard from "./SongCard";

function SearchSongs() {

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);

    const handleSearch = async (e) => {
        const results = await searchSongs(query);
        setSongs(results);
    };

    return (
        <div>
            <h2>Search Songs</h2>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search artist or song"
            />

            <button onClick={handleSearch}>Search</button>

            <div>
                {songs.map((song) => (
                    <SongCard key={song.trackId} song={song} />
                ))}
            </div>
        </div>
    );
}