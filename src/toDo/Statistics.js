// src/toDo/components/StatsDashboard.js
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Statistics.css";

function Statistics({ allTasks }) {
  // 🧩 Vérifier les données reçues
  console.log("📦 Données reçues :", allTasks);

  // 🔄 Normaliser les catégories (éviter "Travail" et "travail" séparés)
  const normalizedTasks = {};

  Object.keys(allTasks).forEach(cat => {
    const normalizedCat =
      cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

    if (!normalizedTasks[normalizedCat]) {
      normalizedTasks[normalizedCat] = [...allTasks[cat]];
    } else {
      normalizedTasks[normalizedCat].push(...allTasks[cat]);
    }
  });

  const categories = Object.keys(normalizedTasks);

  // 📊 Données du camembert
  const dataPie = categories.map(cat => ({
    name: cat,
    value: normalizedTasks[cat].length,
  }));

  // 📊 Données du graphique à barres
  const dataBar = categories.map(cat => ({
    category: cat,
    completed: normalizedTasks[cat].filter(t => t.completed).length,
    pending: normalizedTasks[cat].filter(t => !t.completed).length,
  }));

  // 🎨 Couleurs
  const COLORS = ["#C83FAF", "#4A2C92", "#2E4FCF", "#3AA5F7", "#F25C4A"];

  return (
    <div className="stats-page">
      <div className="stats-container">
        <h2 className="stats-title">📊 Tableau de bord</h2>

        <div className="charts">
          {/* 🥧 Camembert */}
          <div className="chart-box">
            <h3>Tâches par catégorie</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataPie}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Barres */}
          <div className="chart-box">
            <h3>Tâches complétées vs en attente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3AA5F7" />
                <Bar dataKey="pending" fill="#F25C4A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
