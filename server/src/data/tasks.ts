import type { Task } from "../types/task";

export const tasks: Task[] = [
    {
        id: "task-001",
        title: "Learn TypeScript",
        description: "Practice TypeScript fundamentals",
        priority: "high",
        completed: false,
        category: "study",
        createdAt: new Date().toISOString(),
    },
    {
        id: "task-002",
        title: "Build TaskFlow API",
        priority: "medium",
        completed: false,
        category: "work",
        createdAt: new Date().toISOString(),
    },
];