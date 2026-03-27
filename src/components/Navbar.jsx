import { useAuth} from '../context/useAuth'

function Navbar() {
    const { logout } = useAuth();

    return (
        <div className='navbar'>
            <div className='logo'>Choosin' Country</div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Navbar;
