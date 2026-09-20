import { useEffect, useState } from "react";

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../api/tasks";


import type { CreateTask, Task } from "../types/task";

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

    const addTask = async (newTask: CreateTask): Promise<void> => {
        try {
            const createdTask = await createTask(newTask);

            setTasks((currentTasks) => [
                ...currentTasks,
                createdTask,
            ]);
        } catch {
            setError("Failed to create task");
        }
    };

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
                    currentTask.id === id ? updatedTask : currentTask,
                ),
            );
        } catch {
            setError("Failed to update task");
        }
    };


    const removeTask = async (id: string): Promise<void> => {
        try {
            await deleteTask(id);

            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== id),
            );
        } catch {
            setError("Failed to delete task");
        }
    };

    return {
        tasks,
        loading,
        error,
        addTask,
        toggleTask,
        removeTask,
    };

}

export default useTasks;
