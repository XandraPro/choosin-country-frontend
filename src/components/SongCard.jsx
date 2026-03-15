import { saveSong, playSong } from '../api/songs';

function SongCard({ song }) {
    const handleSave = () => {
        saveSong({
            trackId: song.trackId,
            title: song.songTitle,
            artist: song.artist,
            artwork: song.artwork,
            previewUrl: song.previewUrl,
        });
    };

    const handlePlay = () => {
        playSong(song.previewUrl);  
        };

    return (
        <div className="song-card">
            <img src={song.artwork} />

            <h4>{song.songTitle}</h4>
            <p>{song.artist}</p>

            <audio controls src={song.previewUrl} onPlay={handlePlay}/>

            <button onClick={handleSave}>Save Song</button>
        </div>
    );
}

export default SongCard;
            