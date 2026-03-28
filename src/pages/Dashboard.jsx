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
  const [activeTab, setActiveTab] = useState("trending");

  const handlePlayToggle = (song) => {
    const currentId =
      currentSong?.trackId || currentSong?._id || currentSong?.songTitle;
    const nextId = song?.trackId || song?._id || song?.songTitle;

    if (currentId === nextId) {
      setCurrentSong(null);
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="content">
        <h1>🤠 Country Music Explorer</h1>

        <div className="dashboard-tabs">
          <button
            className={activeTab === "trending" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("trending")}
          >
            🔥 Trending
          </button>

          <button
            className={activeTab === "search" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("search")}
          >
            🔎 Search
          </button>

          <button
            className={activeTab === "mySongs" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("mySongs")}
          >
            💾 My Songs
          </button>
        </div>

        {activeTab === "trending" && (
          <Trending setCurrentSong={handlePlayToggle} />
        )}

        {activeTab === "search" && (
          <SearchSongs
            setCurrentSong={handlePlayToggle}
            setRefreshMySongs={setRefreshMySongs}
          />
        )}

        {activeTab === "mySongs" && (
          <MySongs
            setCurrentSong={handlePlayToggle}
            refreshMySongs={refreshMySongs}
            setRefreshMySongs={setRefreshMySongs}
          />
        )}
      </div>

      <Player song={currentSong} onClose={() => setCurrentSong(null)} />
    </div>
  );
}

export default Dashboard;