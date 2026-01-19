// Home.js
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Section Hero */}
      <header className="hero">
        <h1>Bienvenue sur <span className="brand">TDL</span> ✅</h1>
        <p className="subtitle">
          Organisez vos tâches par catégorie et boostez votre productivité 🚀
        </p>
      </header>

      {/* Catégories */}
      <section className="categories">
        <Link to="/todo/travail" className="category-card">
          <span className="icon">🏢</span>
          <h2>Travail</h2>
          <p>Planifiez et suivez vos projets professionnels.</p>
        </Link>

        <Link to="/todo/personnel" className="category-card">
          <span className="icon">🙋</span>
          <h2>Personnel</h2>
          <p>Organisez vos objectifs personnels au quotidien.</p>
        </Link>

        <Link to="/todo/maison" className="category-card">
          <span className="icon">🏠</span>
          <h2>Maison</h2>
          <p>Ne ratez aucune tâche domestique importante.</p>
        </Link>
      </section>
    </div>
  );
}

export default Home;
