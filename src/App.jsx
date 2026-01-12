//Import
import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

export default function App() {
  // Stato principale con fake tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Prima task", status: "todo" },
    { id: 2, title: "Seconda task", status: "doing" },
    { id: 3, title: "Terza task", status: "done" },
    { id: 4, title: "Quarta task", status: "todo" },
    { id: 5, title: "Quinta task", status: "todo" },
    { id: 6, title: "Sesta task", status: "doing" },
    { id: 7, title: "Settima task", status: "done" },
    { id: 8, title: "Ottava task", status: "todo" },
  ]);

  // Stato che gestisce quale filtro è attivo, non modifica i dati originali
  const [filterStatus, setFilterStatus] = useState("all");
  // Stato per input controllato del form
  const [taskTitle, setTaskTitle] = useState("");

  // Funzione aggiunta nuove task
  function handleAddTask(e) {
    // Evito il refresh al submit
    e.preventDefault();
    console.log("submit");

    // Validazione per non aggiungere task vuote
    if (taskTitle.trim() === "") return;

    // Creo una nuova task
    const newTask = {
      id: Date.now(), // Genero un id unico
      title: taskTitle,
      status: "todo", // Default
    };

    // Aggiorno lo stato creando un nuovo array, mantengo immutato l'array originale(IMPORTANTE)
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle(""); // Reset
  }

  // Funzione per eliminare una task tramite id
  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  // Funzione per gestire il cambio stato di una task
  function handleChangeStatus(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task, // Copio la task originale
              status: task.status === "todo" ? "doing" : task.status === "doing" ? "done" : "todo", // Cambio lo status
            }
          : task
      )
    );
  }

  // Creo i filtri per separare le task in base allo stato(No state, dato derivato)
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

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
