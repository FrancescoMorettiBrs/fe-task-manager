import TaskItem from "./TaskItem";

// Componente che si occupa esclusivamente di renderizzare la lista di task
// Non possiede stato: riceve dati e callback dal componente padre
export default function TaskList({ tasks, onDeleteTask, onToggleStatus }) {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleStatus={onToggleStatus} />
      ))}
    </ul>
  );
}
