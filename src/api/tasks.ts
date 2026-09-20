import type { CreateTask, Task } from "../types/task";

type TasksResponse = {
    success: boolean;
    data: Task[];
    message?: string;
};

type TaskResponse = {
    success: boolean;
    data: Task;
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

export async function createTask(
    task: CreateTask,
): Promise<Task> {
    const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    const result: TaskResponse = await response.json();

    return result.data;
}

export async function updateTask(
    id: string,
    updates: Partial<Task>,
): Promise<Task> {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    const result: TaskResponse = await response.json();

    return result.data;
}


export async function deleteTask(id: string): Promise<void> {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}

