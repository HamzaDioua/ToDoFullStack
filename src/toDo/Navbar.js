// src/toDo/components/Navbar.js
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaChartBar, FaRobot, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import icone from "./icone.png"
function Navbar({ setUser,setAllTasks }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <img src={icone} alt="TDL Logo" className="logo-icon" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/tasks"><FaTasks /> Tasks</Link></li>
        <li><Link to="/stats"><FaChartBar /> Stats</Link></li>
        <li><Link to="/ai"><FaRobot /> AI Assistant</Link></li>
      </ul>
      <button className="logout-btn" onClick={() => {
        
  localStorage.removeItem("user"); // ✅ Supprimer l’utilisateur sauvegardé
  setUser(null);
  setAllTasks({ Travail: [], Personnel: [], Maison: [] });
      }}>
        <FaSignOutAlt /> Logout
      </button>
    </nav>
  );
}

export default Navbar;
