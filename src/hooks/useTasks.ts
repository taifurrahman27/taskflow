import { useEffect, useState } from "react";

import { getTasks, updateTask } from "../api/tasks";

import type { Task } from "../types/task";

function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTasks = async (): Promise<void> => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch {
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    const toggleTask = async (id: string): Promise<void> => {
        try {
            const task = tasks.find((task) => task.id === id);

            if (!task) {
                return;
            }

            const updatedTask = await updateTask(id, {
                completed: !task.completed,
            });

            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask.id === id ? updatedTask : currentTask
                )
            );
        } catch {
            setError("Failed to update task");
        }
    };

    return {
        tasks,
        loading,
        error,
        toggleTask,
    };
}

export default useTasks;
