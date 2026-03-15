import "../index.css";

function Player({ song }) {
    if (!song) return null;
    return (
        <div className="player">
            <img src={song.artwork} />
            <div>
                <h4>{song.songTitle}</h4>
                <p>{song.artist}</p>

                <audio controls src={song.previewUrl}></audio>
            </div>
        </div>
    )
}

export default Player;