export default function AddTaskForm({ value, onChange, onSubmit }) {
  return (
    // Form per l'inserimento della task
    // La submit viene gestita dal componente padre tramite onSubmit
    <form className="mb-3 d-flex gap-2" onSubmit={onSubmit}>
      {/* Input controllato:
          - value arriva dallo state del padre
          - onChange aggiorna lo state nel padre */}
      <input className="form-control" type="text" placeholder="Aggiungi task" value={value} onChange={onChange} />
      {/* Bottone di submit:
          - disabilitato se l'input è vuoto o contiene solo spazi */}
      <button className="btn btn-primary" type="submit" disabled={!value.trim()}>
        Aggiungi
      </button>
    </form>
  );
}
