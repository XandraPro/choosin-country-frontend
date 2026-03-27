import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchSongs from "../components/SearchSongs";
import Trending from "../components/Trending";
import MySongs from "../components/MySongs";
import Player from "../components/Player";
import "../styles/dashboard.css";

function Dashboard() {
  const [currentSong, setCurrentSong] = useState(null);
  const [refreshMySongs, setRefreshMySongs] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="content">
        <h1>🤠 Country Music Explorer</h1>

        <Trending setCurrentSong={setCurrentSong} />

        <SearchSongs
          setCurrentSong={setCurrentSong}
          setRefreshMySongs={setRefreshMySongs}
        />

        <MySongs
          setCurrentSong={setCurrentSong}
          refreshMySongs={refreshMySongs}
          setRefreshMySongs={setRefreshMySongs}
        />
      </div>

      <Player song={currentSong} />
    </div>
  );
}

export default Dashboard;