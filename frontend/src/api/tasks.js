const API = "http://localhost:9001";

export async function fetchTasks() {
  const res = await fetch(`${API}/tasks/`);
  return res.json();
}

export async function fetchTasksByPriority(priority) {
  const res = await fetch(`${API}/tasks-by-priority/?priority=${priority}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchFilteredTasks({ category, status }) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (status !== null) params.append("status", status);
  const res = await fetch(`${API}/filter-tasks/?${params.toString()}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createTasks(tasks) {
  const res = await fetch(`${API}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tasks),
  });
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}

export async function fetchTaskSummary() {
  const res = await fetch(`${API}/tasks-summary/`);
  return res.json();
}
