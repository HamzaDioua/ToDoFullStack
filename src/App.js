import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./toDo/Login";
import Signup from "./toDo/Signup";
import TodoList from "./toDo/TodoList";
import Home from "./toDo/Home";
import Navbar from "./toDo/Navbar";
import StatsDashboard from "./toDo/Statistics";
import AiAssistant from "./toDo/AI";
import Tasks from "./toDo/Tasks";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [allTasks, setAllTasks] = useState({
    Travail: [],
    Personnel: [],
    Maison: [],
  });

  // 🔹 Charger l'utilisateur depuis localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.id && parsed.email) setUser(parsed);
        else localStorage.removeItem("user"); // invalide → supprime
      } catch {
        localStorage.removeItem("user"); // JSON invalide
      }
    }
  }, []);

  // 🔹 Récupérer les tâches depuis le serveur
  useEffect(() => {
    if (!user?.id) return; // stop si pas d'utilisateur valide

    const fetchTasks = async () => {
      try {
        const categories = ["Travail", "Personnel", "Maison"];
        const tasksData = {};

        for (const cat of categories) {
          const res = await axios.get(
            `http://localhost:5000/tasks/${cat}?user_id=${user.id}`
          );
          tasksData[cat] = res.data.map((t) => ({
            id: t.id,
            text: t.text,
            done: t.completed === 1,
          }));
        }

        setAllTasks(tasksData);
      } catch (err) {
        console.error("Erreur fetchTasks:", err);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    !user ? (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Navbar setUser={setUser} setAllTasks={setAllTasks} />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Home allTasks={allTasks} setAllTasks={setAllTasks} />}
              />
              <Route
                path="/todo/:category"
                element={<TodoList allTasks={allTasks} setAllTasks={setAllTasks} user={user} />}
              />
              <Route
                path="/tasks"
                element={<Tasks allTasks={allTasks} setAllTasks={setAllTasks} />}
              />
              <Route path="/stats" element={<StatsDashboard allTasks={allTasks} />} />
              <Route path="/ai" element={<AiAssistant allTasks={allTasks} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )
  );
}

export default App;
