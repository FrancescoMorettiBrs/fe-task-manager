const API_URL = "http://localhost:3001/tasks";

export async function fetchTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Errore nel recupero delle task");
  return res.json();
}

export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status: "todo" }),
  });

  if (!res.ok) throw new Error("Errore nella creazione");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Errore nel'eliminazione della task");
  }
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Errore nell'aggiornamento della task");
  }

  return res.json();
}
