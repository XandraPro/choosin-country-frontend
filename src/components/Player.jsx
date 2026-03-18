import "../index.css";

function Player({ song }) {
    if (!song) return null;
    return (
        <div className="player-fixed">
            <img src={song.artworkUrl100} />
            <span>{song.trackName}-{song.artistName}</span>
            <audio controls src={song.previewUrl}></audio>
        </div>
    );
}

export default Player;