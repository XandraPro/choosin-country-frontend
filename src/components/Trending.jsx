import { useEffect, useState } from "react";
import { getTrendingSongs } from "../services/songs.service";
import { getCommentsBySong } from "../services/comment.service";

function Trending({ setCurrentSong }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getTrendingSongs();
        const trendingSongs = response.data.data;

        const songsWithComments = await Promise.all(
          trendingSongs.map(async (song) => {
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
        console.error("Trending load error:", error.response?.data || error);
      }
    };

    load();
  }, []);

  return (
    <div className="trending">
      <h2 className="section-title">🔥 Top Trending Country Songs</h2>

      {songs.map((song) => (
        <div className="topSongs" key={song._id}>
          <img src={song.artwork} alt={song.songTitle} />

          <div>
            <p>{song.songTitle}</p>
            <p>{song.artist}</p>

            {song.comments?.length > 0 && (
              <div className="comments-list">
                {song.comments.slice(0, 1).map((comment) => (
                  <p key={comment._id}>💬 {comment.text}</p>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setCurrentSong(song)}>▶ Play</button>
        </div>
      ))}
    </div>
  );
}

export default Trending;