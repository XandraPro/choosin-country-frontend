import { useRef, useState, useEffect} from 'react';
import "./Player.css";

export default function Player({ song }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {

        if(!audioRef.current) return;
        
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const updateProgress = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    if (!song) return null;

    return (
        <div className="player">
            <img src={song.artwork} alt={song.songTitle} className="artwork" />
            <div className="info">
                <h3>{song.songTitle}</h3>
                <p>{song.artist}</p>
            </div>
            <button onClick={togglePlay} className="play-button">
                {playing ? 'Pause' : 'Play'}
            </button>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <audio ref={audioRef} src={song.previewUrl} />
        </div>
    );
}