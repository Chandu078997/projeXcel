import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user }) {
  return (
   <nav className="navbar">
  <div className="logo-container">
    <h2 className="logo">ProjeXcel</h2>
    <h3 className="tagline">("Excel at Projects. Master Your Skills")</h3>
  </div>

  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </ul>
</nav>
)}
export default Navbar;

