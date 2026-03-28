import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchSongs from "../components/SearchSongs";
import Trending from "../components/Trending";
import MySongs from "../components/MySongs";
import StatsTab from "../components/StatsTab";
import Player from "../components/Player";
import { getMySongs, getTrendingSongs } from "../services/songs.service";
import "../styles/dashboard.css";

function Dashboard() {
  const [currentSong, setCurrentSong] = useState(null);
  const [refreshMySongs, setRefreshMySongs] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");

  const [mySongsCount, setMySongsCount] = useState(0);
  const [trendingCount, setTrendingCount] = useState(0);

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

  useEffect(() => {
    const refreshCounters = async () => {
      try {
        const [mySongsRes, trendingRes] = await Promise.all([
          getMySongs(),
          getTrendingSongs(),
        ]);

        setMySongsCount(mySongsRes.data.length);
        setTrendingCount(trendingRes.data.data.length);
      } catch (error) {
        console.error("Counter refresh error:", error.response?.data || error);
      }
    };

    refreshCounters();
  }, [refreshMySongs]);

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
            🔥 Trending ({trendingCount})
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
            💾 My Songs ({mySongsCount})
          </button>

          <button
            className={activeTab === "stats" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("stats")}
          >
            📊 Stats
          </button>
        </div>

        {activeTab === "trending" && (
          <Trending
            setCurrentSong={handlePlayToggle}
            setRefreshMySongs={setRefreshMySongs}
          />
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

        {activeTab === "stats" && <StatsTab />}
      </div>

      <Player song={currentSong} onClose={() => setCurrentSong(null)} />
    </div>
  );
}

export default Dashboard;