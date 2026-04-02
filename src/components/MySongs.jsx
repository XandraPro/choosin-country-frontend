import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  getMySongs,
  deleteMySong,
  voteSong,
} from "../services/songs.service";
import {
  getCommentsBySong,
  updateComment,
} from "../services/comment.service";

function MySongs({ setCurrentSong, refreshMySongs, setRefreshMySongs }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const loadMySongs = async () => {
    try {
      const res = await getMySongs();
      const savedSongs = res.data;

      const songsWithComments = await Promise.all(
        savedSongs.map(async (song) => {
          try {
            const comments = await getCommentsBySong(song._id);
            return {
              ...song,
              comments,
              isFavorite: song.savesCount > 1,
            };
          } catch {
            return {
              ...song,
              comments: [],
              isFavorite: song.savesCount > 1,
            };
          }
        })
      );

      const sortedSongs = [...songsWithComments].sort(
        (a, b) => Number(b.isFavorite) - Number(a.isFavorite)
      );

      setSongs(sortedSongs);
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
      setRefreshMySongs((prev) => !prev);
    } catch (error) {
      console.error("Delete song error:", error.response?.data || error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const handleSaveComment = async (commentId, songId) => {
    if (!editedText.trim()) return;

    try {
      await updateComment(commentId, editedText);

      const comments = await getCommentsBySong(songId);

      setSongs((prev) =>
        prev.map((song) =>
          song._id === songId ? { ...song, comments } : song
        )
      );

      setEditingCommentId(null);
      setEditedText("");
    } catch (error) {
      console.error("Update comment error:", error.response?.data || error);
    }
  };

  const handleVote = async (songId) => {
    try {
      await voteSong(songId);

      setSongs((prev) => {
        const updated = prev.map((song) =>
          song._id === songId
            ? {
                ...song,
                isFavorite: !song.isFavorite,
                savesCount: (song.savesCount || 0) + 1,
              }
            : song
        );

        return [...updated].sort(
          (a, b) => Number(b.isFavorite) - Number(a.isFavorite)
        );
      });
    } catch (error) {
      console.error("Vote error:", error.response?.data || error);
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
        <Motion.div layout className="grid">
          {songs.map((song) => (
            <Motion.div
              layout
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={`song-card ${song.isFavorite ? "favorite-card" : ""}`}
              key={song._id}
            >
              <button
                className={`favorite-heart ${song.isFavorite ? "active" : ""}`}
                onClick={() => handleVote(song._id)}
              >
                {song.isFavorite ? "❤️" : "🤍"}
              </button>

              <img src={song.artwork} alt={song.songTitle} />
              <h4>{song.songTitle}</h4>
              <p>{song.artist}</p>
              {song.isFavorite && (
                <p className="favorite-label">⭐ In your favorites</p>
              )}

              <button onClick={() => setCurrentSong(song)}>
                ▶ Play / Close
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(song._id)}
              >
                🗑️ Delete
              </button>

              {song.comments?.length > 0 && (
                <div className="comments-list">
                  <h5>Comments</h5>

                  {song.comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                      {editingCommentId === comment._id ? (
                        <>
                          <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              handleSaveComment(comment._id, song._id)
                            }
                          >
                            Save edit
                          </button>
                        </>
                      ) : (
                        <>
                          <p>💬 {comment.text}</p>
                          <button onClick={() => handleEditComment(comment)}>
                            ✏ Edit
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Motion.div>
          ))}
        </Motion.div>
      )}
    </div>
  );
}

export default MySongs;