import type { Task } from "../types/task";

export function updateTask(
    task: Task,
    updates: Partial<Task>
): Task {
    return {
        ...task,
        ...updates,
    };
}

export function getTaskSummary(
    task: Task
): Pick<Task, "title" | "priority"> {
    return {
        title: task.title,
        priority: task.priority,
    };
}