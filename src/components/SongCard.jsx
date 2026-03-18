import { useState } from 'react';
import { saveSong} from '../services/songs.service';

function SongCard({ song , setCurrentSong }) {

    const[comment, setComment] = useState("");
    const[saved, setSaved] = useState(false);

    const handleSave = async () => {
        const songData = {
            title:song.trackName,
            artist: song.artisName,
            artwork: song.artworkUrl100,
            preview: song.previewUrl,
            comment: comment
        };
        try {
            await saveSong(songData);
            setSaved(true);
        } catch (error) {
            console.error("Error saving song:", error);
        }
    };

    return (
        <div className='song-card'>
            <img src={song.artworkUrl100} alt={song.trackName} />
            <h4>{song.trackName}</h4>
            <p>{song.artisName}</p>

            <button onClick={() => setCurrentSong(song)}>▶️ Play</button>
            <input placeholder='Add comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleSave}> {saved ? "Saved ✅" : "Save 💾"}</button>
        </div>
    );
}
export default SongCard;