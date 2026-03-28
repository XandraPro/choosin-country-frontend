import "../index.css";

function Player({ song, onClose }) {
  if (!song) return null;

  return (
    <div className="player-fixed">
      <img
        src={song.artworkUrl100 || song.artwork}
        alt={song.trackName || song.songTitle}
      />

      <div className="player-info">
        <p>{song.trackName || song.songTitle}</p>
        <p>{song.artistName || song.artist}</p>
      </div>

      <audio
        controls
        autoPlay
        src={song.previewUrl}
        onEnded={onClose}
      />

      <button className="player-close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Player;