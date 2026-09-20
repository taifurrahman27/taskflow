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
    {
        id: "task-003",
        title: "Read TypeScript Documentation",
        description: "Study interfaces, generics, and utility types",
        priority: "low",
        completed: true,
        category: "study",
        createdAt: new Date().toISOString(),
    },
    {
        id: "task-004",
        title: "Test TaskFlow Endpoints",
        description: "Test GET, POST, PATCH, and DELETE task endpoints",
        priority: "high",
        completed: false,
        category: "work",
        createdAt: new Date().toISOString(),
    },
];