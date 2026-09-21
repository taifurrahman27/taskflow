import type { CreateTask, Task } from "../types/task";

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

async function request<T>(
    url: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const result: ApiResponse<T> = await response.json();

    return result.data;
}

export async function getTasks(): Promise<Task[]> {
    return request<Task[]>("http://localhost:5000/tasks");
}

export async function createTask(
    task: CreateTask,
): Promise<Task> {
    return request<Task>("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
}

export async function updateTask(
    id: string,
    updates: Partial<Task>,
): Promise<Task> {
    return request<Task>(
        `http://localhost:5000/tasks/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        },
    );
}

export async function deleteTask(
    id: string,
): Promise<void> {
    await request<unknown>(
        `http://localhost:5000/tasks/${id}`,
        {
            method: "DELETE",
        },
    );
}