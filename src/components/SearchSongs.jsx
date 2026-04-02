import { useState } from "react";
import { searchItunes } from "../services/itunes.service";
import SongCard from "./SongCard";

function SearchSongs({ setCurrentSong, setRefreshMySongs }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);
      const results = await searchItunes(query);
      setSongs(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section">
      <h2 className="section-title">🔍 Search Country Songs</h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artist or song..."
        />

        <button type="submit">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid">
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCard
              key={song.trackId}
              song={song}
              setCurrentSong={setCurrentSong}
              setRefreshMySongs={setRefreshMySongs}
            />
          ))
        ) : (
          !loading &&
          hasSearched && (
            <p style={{ gridColumn: "1 / -1" }}>
              🤠 No country songs or artists found for "{query}"
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default SearchSongs;