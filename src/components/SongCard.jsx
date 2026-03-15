import { useState } from 'react';
import { saveSong} from '../api/songs';

function SongCard({ song }) {

    const[comment, setComment] = useState("");
    const[saved, setSaved] = useState(false);

    const handleSave = async () => {
        const songData = {
            title:song.trackName,
            artist: song.artisName,
            artwork: song.artwork,
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
            <img src={song.artwork} alt={song.trackName} />
            <h4>{song.trackName}</h4>
            <p>{song.artisName}</p>
            <audio controls src={song.previewUrl}></audio>

            <input>
                type="text"
                placeholder="Write your comment"
                value={comment}
                onChage(e)={(e) => setComment(e.target.value)}
            </input>
            <button onClick={handleSave}>
                {saved ? "Saved" : "Save song"}
            </button>
        </div>
    );
}
export default SongCard;