// Componente che rappresenta una singola task
export default function TaskItem({ task, onDeleteTask, onToggleStatus }) {
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {/* Titolo della task:
            - la classe dipende dallo stato (todo, doing, done) */}
        <span className={`task-title ${task.status}`}>{task.title}</span>
        <div className="btn-group btn-group-sm">
          {/* Delete button */}
          <button className="btn btn-outline-danger ms-2" onClick={() => onDeleteTask(task.id)}>
            ❌
          </button>
          {/* Toggle button */}
          <button className="btn btn-outline-secondary" onClick={() => onToggleStatus(task.id)}>
            🔄
          </button>
        </div>
      </li>
    </div>
  );
}
