import { useState } from "react";
import type { Task } from "./types/task";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

function App() {

  const handleAddTask = (newTask: Task): void => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-001",
      title: "Learn TypeScript",
      description: "Practice TypeScript fundamentals",
      priority: "high",
      completed: false,
      category: "study",
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-002",
      title: "Build TaskFlow",
      priority: "medium",
      completed: false,
      category: "work",
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleToggle = (id: string): void => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <main>
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <p>Total tasks: {tasks.length}</p>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
        />
      ))}
    </main>
  );
}

export default App;