import type { Task } from "./task";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export type TasksResponse = ApiResponse<Task[]>;

export type TaskResponse = ApiResponse<Task>;
