export async function getTodos() {
  const response = await fetch("/api/todo/todos");
  const data = await response.json();
  return data;
}
