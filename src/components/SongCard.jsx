import { useState } from "react";
import { saveSong } from "../services/songs.service";
import { createComment, getCommentsBySong } from "../services/comment.service";

function SongCard({ song, setCurrentSong }) {
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);

  const loadComments = async (currentSongId) => {
    if (!currentSongId) return;

    try {
      const res = await getCommentsBySong(currentSongId);
      setComments(res.data);
    } catch (error) {
      console.error("Load comments error:", error.response?.data || error);
    }
  };

  const handleSave = async () => {
    if (!comment.trim()) {
      alert("Comment is required");
      return;
    }

    try {
      const songRes = await saveSong({
        trackId: song.trackId,
        songTitle: song.trackName,
        artist: song.artistName,
        artwork: song.artworkUrl100,
        previewUrl: song.previewUrl,
      });

      const savedSongId = songRes.data._id;

      await createComment({
        songId: savedSongId,
        text: comment,
      });

      setSaved(true);
      setComment("");

      await loadComments(savedSongId);
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  return (
    <div className="song-card">
      <img src={song.artworkUrl100} alt={song.trackName} />
      <h4>{song.trackName}</h4>
      <p>{song.artistName}</p>

      <button onClick={() => setCurrentSong(song)}>▶️ Play</button>

      <input
        type="text"
        placeholder="Add comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleSave}>
        {saved ? "Saved ✅" : "Save 💾"}
      </button>

      {comments.length > 0 && (
        <div className="comments-list">
          <h5>Comments</h5>
          {comments.map((c) => (
            <p key={c._id}>💬 {c.text}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SongCard;