import { useEffect, useState } from "react";
import { getMySongs, deleteMySong } from "../services/songs.service";
import { getCommentsBySong } from "../services/comment.service";

function MySongs({ setCurrentSong, refreshMySongs, setRefreshMySongs }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMySongs = async () => {
    try {
      const res = await getMySongs();
      const savedSongs = res.data;

      const songsWithComments = await Promise.all(
        savedSongs.map(async (song) => {
          try {
            const comments = await getCommentsBySong(song._id);
            return { ...song, comments };
          } catch {
            return { ...song, comments: [] };
          }
        })
      );

      setSongs(songsWithComments);
    } catch (error) {
      console.error("MySongs error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMySongs();
  }, [refreshMySongs]);

  const handleDelete = async (songId) => {
    try {
      await deleteMySong(songId);
      setSongs((prev) => prev.filter((song) => song._id !== songId));

      if (setRefreshMySongs) {
        setRefreshMySongs((prev) => !prev);
      }
    } catch (error) {
      console.error("Delete song error:", error.response?.data || error);
    }
  };

  if (loading) {
    return <p>Loading your songs...</p>;
  }

  return (
    <div className="my-songs">
      <h2 className="section-title">💾 My Songs</h2>

      {songs.length === 0 ? (
        <p>You have no saved songs yet.</p>
      ) : (
        <div className="grid">
          {songs.map((song) => (
            <div className="song-card" key={song._id}>
              <img src={song.artwork} alt={song.songTitle} />
              <h4>{song.songTitle}</h4>
              <p>{song.artist}</p>

              <button onClick={() => setCurrentSong(song)}>▶️ Play</button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(song._id)}
              >
                🗑 Delete
              </button>

              {song.comments?.length > 0 && (
                <div className="comments-list">
                  <h5>Comments</h5>
                  {song.comments.map((comment) => (
                    <p key={comment._id}>💬 {comment.text}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySongs;