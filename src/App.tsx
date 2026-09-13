import TaskItem from "./components/TaskItem";
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
      <h1>TaskFlow</h1>

      <TaskItem
        task={task} />
    </main>
  );
}

export default App;