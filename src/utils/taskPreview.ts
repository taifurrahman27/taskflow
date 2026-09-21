import type { Task, TaskPreview } from "../types/task";

export function createTaskPreview(
    task: Task,
): TaskPreview {
    return {
        title: task.title,
        priority: task.priority,
        completed: task.completed,
    };
}
