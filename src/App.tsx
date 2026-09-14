import { useState } from "react";

import useLocalStorage from "./hooks/useLocalStorage";

import type { Task } from "./types/task";
import type { TaskFilter } from "./types/filter";

import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "taskflow-tasks",
    [
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
    ]
  );

  const [filter, setFilter] = useState<TaskFilter>("all");

  const handleAddTask = (newTask: Task): void => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const handleToggle = (id: string): void => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <main>
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <p>Total tasks: {tasks.length}</p>

      {filteredTasks.map((task) => (
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
