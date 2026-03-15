import { useState } from "react";
import { searchItunes } from "../services/itunes.service";
import SongCard from "./SongCard";

function SearchSongs() {

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);

    const handleSearch = async () => {
        if (!query) return;

        try {
            const results = await searchItunes(query);
            setSongs(results);
        } catch (error) {
            console.error('Search error', error)
        }
    };

    return (
        <div>
            <h2>Search Songs</h2>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artist or song"
            />

            <button onClick={handleSearch}>Search</button>

            <div>
                {songs.length === 0 ? (
                    <p>No songs found</p>
                ): (
                    songs.map ((song) => (
                    <SongCard key={song.trackId} song={song} />
                ))
                )}
            </div>
        </div>
    );
}

export default SearchSongs;