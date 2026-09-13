import type { Task } from "./types/task";

function App() {
  const task: Task = {
    id: "task-001",
    title: "Learn TypeScript",
    description: "Practice TypeScript fundamentals",
    priority: "high",
    completed: false,
    category: "study",
    createdAt: new Date().toISOString(),
  };

  return (
    <main>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Category: {task.category}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
    </main>
  );
}

export default App;