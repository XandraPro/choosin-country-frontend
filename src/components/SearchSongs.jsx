import { useState } from "react";
import { searchItunes } from "../services/itunes.service";
import SongCard from "./SongCard";

function SearchSongs({ setCurrentSong}) {

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        try {
            setLoading(true);
            const results = await searchItunes(query);
            setSongs(results);
        } catch (error) {
            console.error('Search error', error)
        }finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="section-title">🔍 Search Country Songs</h2>
            <div className="search-bar">
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artist or song..."
            />

            <button onClick={handleSearch}>{loading ? "Searching..." : "Search"}</button>
        </div>
            <div className="grid">
                {songs.length > 0 ? (
                songs.map((song) => (
                    <SongCard key={song.trackId} song={song} setCurrentSong={setCurrentSong} />
                ))
            ) : (!loading && <p>No results yet...</p>
            )}
            </div>
        </div>
    );
}

export default SearchSongs;