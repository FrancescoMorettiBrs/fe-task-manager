//Import
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { createTask, updateTask, deleteTask, fetchTasks } from "./api/tasks.js";

const API_URL = "http://localhost:3001/tasks";

export default function App() {
  // Stato principale con fake tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const newTask = await createTask(taskTitle);
      setTasks((prev) => [...prev, newTask]);
      setTaskTitle("");
    } catch (err) {
      alert(err.message);
    }
  }

  // Funzione per eliminare una task tramite id
  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);

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

    if (!currentTask) return;

    // Calcolo il prossimo stato
    const nextStatus = currentTask.status === "todo" ? "doing" : currentTask.status === "doing" ? "done" : "todo";

    try {
      const updatedTask = await updateTask(taskId, {
        status: nextStatus,
      });

      // Aggiorno lo state sostituendo la task aggiornata
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)));
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
