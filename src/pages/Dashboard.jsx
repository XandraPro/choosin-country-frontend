import SearchSongs from "../components/SearchSongs"
import Trending from "../components/Trending"
import { useAuth } from "../context/useAuth"

function Dashboard() {
  const { logout } = useAuth;
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>
        Logout
        </button>
        <Trending />
        <SearchSongs />
    </div>
  );
}
export default Dashboard;
