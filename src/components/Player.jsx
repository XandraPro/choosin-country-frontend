import "../index.css";

function Player({ song }) {
    if (!song) return null;

    return (
        <div className="player-fixed">
            <img src={song.artworkUrl100 || song.artwork} />
            <div>
                <p>{song.trackName || song.title}</p>
                <p>{song.artistName || song.artist}</p>
            </div>
            <audio controls src={song.previewUrl || song.preview}></audio>
        </div>
    );
}

export default Player;