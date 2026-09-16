import type { CreateTask, Task } from "../types/task";

export function isCreateTask(value: unknown): value is CreateTask {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const task = value as Record<string, unknown>;

    return (
        typeof task.title === "string" &&
        typeof task.priority === "string" &&
        ["low", "medium", "high"].includes(task.priority) &&
        typeof task.completed === "boolean" &&
        typeof task.category === "string" &&
        ["work", "study", "personal"].includes(task.category) &&
        typeof task.createdAt === "string"
    );
}

export function isTaskUpdate(value: unknown): value is Partial<Task> {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const updates = value as Record<string, unknown>;

    if (
        "title" in updates &&
        typeof updates.title !== "string"
    ) {
        return false;
    }

    if (
        "priority" in updates &&
        (typeof updates.priority !== "string" ||
            !["low", "medium", "high"].includes(updates.priority))
    ) {
        return false;
    }

    if (
        "completed" in updates &&
        typeof updates.completed !== "boolean"
    ) {
        return false;
    }

    if (
        "category" in updates &&
        (typeof updates.category !== "string" ||
            !["work", "study", "personal"].includes(updates.category))
    ) {
        return false;
    }

    if (
        "description" in updates &&
        updates.description !== undefined &&
        typeof updates.description !== "string"
    ) {
        return false;
    }

    if (
        "createdAt" in updates &&
        typeof updates.createdAt !== "string"
    ) {
        return false;
    }

    return true;
}