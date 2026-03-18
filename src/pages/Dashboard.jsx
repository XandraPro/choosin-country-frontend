import { useState } from "react";
import Navbar from "../components/SearchSongs"
import SearchSongs from "../components/SearchSongs"
import Trending from "../components/Trending"
import Player from "../components/Player"
import "../styles/dashboard.css"

function Dashboard() {
  const [currentSong, setCurrentSong] = useState(null);
  return (
    <div className="dashboard">
     <Navbar />
     <h1>🤠 Country Music Explorer</h1>
     <Trending setCurrentSong={setCurrentSong} />
     <SearchSongs setCurrentSong={setCurrentSong} />
     <Player song={currentSong} />
    </div>
  );
}
export default Dashboard;
