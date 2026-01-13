//Import
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

const API_URL = "http://localhost:3001/tasks";

export default function App() {
  // Stato principale con fake tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTasks() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Errore nel recupero delle task");
    return res.json();
  }

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Stato che gestisce quale filtro è attivo, non modifica i dati originali
  const [filterStatus, setFilterStatus] = useState("all");
  // Stato per input controllato del form
  const [taskTitle, setTaskTitle] = useState("");

  // Funzione aggiunta nuove task
  async function handleAddTask(e) {
    // Evito il refresh al submit
    e.preventDefault();

    // Validazione per non aggiungere task vuote
    if (!taskTitle.trim()) return;

    try {
      const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          status: "todo",
        }),
      });

      if (!res.ok) {
        throw new Error("Errore nella creazione della task");
      }

      const createdTask = await res.json();

      // Aggiorno lo stato creando un nuovo array, mantengo immutato l'array originale(IMPORTANTE)
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setTaskTitle(""); // Reset
    } catch (err) {
      alert(err.message);
    }
  }

  // Funzione per eliminare una task tramite id
  async function handleDeleteTask(taskId) {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Errore nel'eliminazione della task");
      }

      // Aggiorno lo state rimuovendo la task eliminata
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      alert(error.message);
    }
  }

  // Funzione per gestire il cambio stato di una task
  async function handleChangeStatus(taskId) {
    // Recupero la task corrente
    const currentTask = tasks.find((task) => task.id === taskId);

    if (currentTask) return;

    // Calcolo il prossimo stato
    const nextStatus = currentTask.status === "todo" ? "doing" : currentTask.status === "doing" ? "done" : "todo";

    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        throw new Error("Errore nell'aggiornamento della task");
      }

      // Aggiorno lo state sostituendo la task aggiornata
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updateTask : task)));
    } catch (error) {
      alert(error.message);
    }
  }

  // Creo i filtri per separare le task in base allo stato(No state, dato derivato)
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <AddTaskForm value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} onSubmit={handleAddTask} />
      <div className="btn-group mb-3">
        <button className={`btn btn-outline-primary ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>
          All
        </button>
        <button className={`btn btn-outline-primary ${filterStatus === "todo" ? "active" : ""}`} onClick={() => setFilterStatus("todo")}>
          Todo
        </button>
        <button className={`btn btn-outline-primary ${filterStatus === "doing" ? "active" : ""}`} onClick={() => setFilterStatus("doing")}>
          Doing
        </button>
        <button className={`btn btn-outline-primary ${filterStatus === "done" ? "active" : ""}`} onClick={() => setFilterStatus("done")}>
          Done
        </button>
      </div>
      <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} onToggleStatus={handleChangeStatus} />
    </div>
  );
}
