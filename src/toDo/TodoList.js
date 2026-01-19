import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TodoList.css";

function TodoList({ allTasks, setAllTasks, user }) {
  const { category } = useParams(); // "Travail", "Personnel", "Maison"
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Ajouter une tâche
  const addTask = async () => {
    if (!newTask.trim()) return;
    if (!user?.id) {
      alert("⚠️ Vous devez être connecté pour ajouter une tâche !");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/tasks/${category}`, {
        text: newTask,
        user_id: user.id,
      });

      // Mise à jour locale
      setAllTasks(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), { ...res.data, done: false }],
      }));

      setNewTask("");
    } catch (err) {
      console.error("Erreur addTask:", err);
      alert("❌ Impossible d'ajouter la tâche !");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Basculer l'état "done" d'une tâche
  const toggleTask = (index) => {
    setAllTasks(prev => {
      const updatedTasks = [...(prev[category] || [])];
      updatedTasks[index].done = !updatedTasks[index].done;
      return { ...prev, [category]: updatedTasks };
    });
  };

  // 🔹 Charger les tâches si jamais elles ne sont pas encore là
  useEffect(() => {
    if (!user?.id) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/tasks/${category}?user_id=${user.id}`
        );
        setAllTasks(prev => ({
          ...prev,
          [category]: res.data.map(t => ({
            id: t.id,
            text: t.text,
            done: t.completed === 1,
          })),
        }));
      } catch (err) {
        console.error("Erreur fetchTasks:", err);
      }
    };

    if (!allTasks[category] || allTasks[category].length === 0) {
      fetchTasks();
    }
  }, [category, user]);

  return (
    <div className="todo-page">
      <h1>Liste des tâches : {category}</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          disabled={!user?.id}
        />
        <button onClick={addTask} disabled={!user?.id || loading}>
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </div>

      <ul className="task-list">
        {(allTasks[category] || []).map((task, i) => (
          <li
            key={task.id || i}
            className={task.done ? "done" : ""}
            onClick={() => toggleTask(i)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
