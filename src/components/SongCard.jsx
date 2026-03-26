import { useState } from 'react';
import { saveSong} from '../services/songs.service';
import { createComment } from '../services/comment.service';

function SongCard({ song , setCurrentSong }) {

    const[comment, setComment] = useState("");
    const[saved, setSaved] = useState(false);

    const handleSave = async () => {
        
        if (!comment.trim()) {
            alert("Comment is required");
            return;
        }

        try {

        const songData = await saveSong({
            trackId: song.trackId,
            songTitle: song.trackName,
            artist: song.artisName,
            artwork: song.artworkUrl100,
            previewUrl: song.previewUrl
        });

        await createComment({
            songId: songData.data._id,
            text: comment
        });
    
        setSaved(true);

        } catch (error) {
            console.error("Error", error.response?.data || error);
        }
    };

    return (
        <div className='song-card'>
            <img src={song.artworkUrl100} alt={song.trackName} />
            <h4>{song.trackName}</h4>
            <p>{song.artisName}</p>

            <button onClick={() => setCurrentSong(song)}>▶️ Play</button>
            <input type="text" placeholder='Add comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleSave}> {saved ? "Saved ✅" : "Save 💾"}</button>
        </div>
    );
}

export default SongCard;