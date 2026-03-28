import { useEffect, useState } from "react";
import { getStats } from "../services/stats.service";

function StatsTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (error) {
        console.error("Stats error:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p>📊 Loading stats...</p>;
  }

  if (!stats) {
    return <p>No stats available.</p>;
  }

  return (
    <div className="stats-tab">
      <h2 className="section-title">📊 Platform Stats</h2>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Songs</h3>
          <p>{stats.totalSongs}</p>
        </div>

        <div className="stats-card">
          <h3>Total Plays</h3>
          <p>{stats.totalPlays}</p>
        </div>

        <div className="stats-card">
          <h3>Total Saves</h3>
          <p>{stats.totalSaves}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsTab;