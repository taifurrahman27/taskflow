import { useState } from "react";

import useTasks from "./hooks/useTasks";

import type { CreateTask } from "./types/task";
import type { TaskFilter } from "./types/filter";

import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

function App() {
  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
  } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>("all");

  const handleAddTask = (newTask: CreateTask): void => {
    void addTask(newTask);
  };

  const handleToggle = (id: string): void => {
    void toggleTask(id);
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

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>TaskFlow</h1>

      <TaskForm onAddTask={handleAddTask} />

      <div>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

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
