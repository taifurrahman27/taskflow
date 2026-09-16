import type { Task } from "../types/task";

type TasksResponse = {
    success: boolean;
    data: Task[];
    message?: string;
};

export async function getTasks(): Promise<Task[]> {
    const response = await fetch("http://localhost:5000/tasks");

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    const result: TasksResponse = await response.json();

    return result.data;
}