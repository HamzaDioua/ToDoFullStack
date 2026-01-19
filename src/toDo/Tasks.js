import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.css"
function Tasks() {
  const [allTasks, setAllTasks] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) return; // 🔹 Vérifie que l'utilisateur est connecté

    const categories = ["Travail", "Personnel", "Maison"];
    const fetchTasks = async () => {
      const tasksByCat = {};
      try {
        for (const cat of categories) {
          const res = await axios.get(
            `http://localhost:5000/tasks/${cat}?user_id=${user.id}`
          );
          tasksByCat[cat] = res.data.map(t => ({
            id: t.id,
            text: t.text,
            done: t.completed === 1,
          }));
        }
        setAllTasks(tasksByCat);
      } catch (err) {
        console.error("Erreur fetchTasks:", err);
      }
    };

    fetchTasks();
  }, [user]);

  if (!user) return <p>⚠️ Vous devez vous connecter pour voir vos tâches.</p>;

  return (
    <div className="tasks-page">
      <h1>Toutes mes tâches</h1>
      {Object.keys(allTasks).map((cat) => (
        <div key={cat} className="category-section">
          <h2>{cat}</h2>
          <ul>
            {allTasks[cat]?.map((task) => (
              <li key={task.id} className={task.done ? "done" : ""}>
                {task.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
