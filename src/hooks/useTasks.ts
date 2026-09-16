import { useEffect, useState } from "react";

import { getTasks } from "../api/tasks";
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

    return {
        tasks,
        loading,
        error,
    };
}

export default useTasks;