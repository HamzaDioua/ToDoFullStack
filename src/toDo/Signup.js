import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // 👈 import du CSS

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { email, password });
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      alert("Erreur lors de l'inscription !");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
