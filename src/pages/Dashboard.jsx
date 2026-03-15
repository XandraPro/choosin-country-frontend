import { useState, useEffect } from "react";
import { searchItunes } from "../services/itunes.service"
import {
 saveSong,
 getTopSongs,
 voteSong,
} from "../services/songs.service";
import { useAuth } from "../context/AuthContext";
import Player from "../components/Player";

export default function Dashboard() {
 const { logout } = useAuth();

 const [query, setQuery] = useState("");
 const [results, setResults] = useState([]);
 const [comment, setComment] = useState("");
 const [topSongs, setTopSongs] = useState([]);
 const [currentSong, setCurrentSong] = useState(null);

 // buscar canciones
 const handleSearch = async (e) => {
   e.preventDefault();

   const songs = await searchItunes(query);
   setResults(songs);
 };

 // guardar canción
 const handleSave = async (song) => {
   await saveSong({
     title: song.title,
     artist: song.artist,
     artwork: song.artworkUrl,
     preview: song.previewUrl,
     comment,
   });

   alert("Song saved!");
   loadTopSongs();
 };

 // votar canción
 const handleVote = async (id) => {
   await voteSong(id);
   loadTopSongs();
 };

 const loadTopSongs = async () => {
   const songs = await getTopSongs();
   setTopSongs(songs);
 };

 useEffect(() => {
   loadTopSongs();
 }, []);

 return (
   <div className="dashboard">

     <header className="header">
       <h1>Country Music Hub</h1>
       <button onClick={logout}>Logout</button>
     </header>

     {/* BUSCADOR */}
     <section className="search">

       <h2>Search Country Songs</h2>

       <form onSubmit={handleSearch}>
         <input
           type="text"
           placeholder="Search artist or song"
           value={query}
           onChange={(e) => setQuery(e.target.value)}
         />

         <button type="submit">Search</button>
       </form>

     </section>

     {/* RESULTADOS ITUNES */}
     <section className="results">

       {results.map((song) => (
         <div key={song.trackId} className="songCard">

           <img src={song.artworkUrl100} alt={song.trackName} />

           <h3>{song.trackName}</h3>

           <p>{song.artistName}</p>

           <audio controls src={song.previewUrl}></audio>
           <button onClick={() => setCurrentSong(song)}>
             Open Player
           </button>

           <textarea
             placeholder="Add a comment"
             onChange={(e) => setComment(e.target.value)}
           />

           <button onClick={() => handleSave(song)}>
             Save Song
           </button>

         </div>
       ))}

     </section>

     {/* TOP 10 */}
     <section className="topSongs">

       <h2>Top Country Songs</h2>

       {topSongs.map((song) => (
         <div key={song._id} className="topSong">

           <img src={song.artwork} alt={song.title} />

           <div>

             <h3>{song.title}</h3>

             <p>{song.artist}</p>

             <p>Votes: {song.score}</p>

             <button onClick={() => handleVote(song._id)}>
               Vote
             </button>

           </div>

         </div>
       ))}

     </section>
    <Player song={currentSong}/>
   </div>
 );
 
}
