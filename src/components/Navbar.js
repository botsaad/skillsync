import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">My Profile</Link>
      <button onClick={() => auth.signOut()}>Log Out</button>
    </nav>
  );
};

export default Navbar;
