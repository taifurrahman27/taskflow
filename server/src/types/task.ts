export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
    category: "work" | "study" | "personal";
    createdAt: string;
};