import { useState } from "react";
import { searchItunes } from "../services/itunes.service";
import SongCard from "./SongCard";

function SearchSongs({ setCurrentSong, setRefreshMySongs }) {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

 const handleSearch = async () => {
  if (!query) return;

  try {
    setLoading(true);
    const results = await searchItunes(query);
    setSongs(results);
    setHasSearched(true); // 🔥 importante
  } catch (error) {
    console.error("Search error", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="search-section">
      <h2 className="section-title">🔍 Search Country Songs</h2>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artist or song..."
        />

        <button onClick={handleSearch}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

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