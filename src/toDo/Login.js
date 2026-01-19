import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res.data.user) {
        const userData = { id: res.data.user.id, email: res.data.user.email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/tasks");
      }
    } catch (err) {
      console.error("Erreur login:", err);
      alert("❌ Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br />
          <input type="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <button type="submit">Se connecter</button>
          <Link to="/signup">Créer un nouveau compte</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
