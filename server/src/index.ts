import express from "express";

import { tasks } from "./data/tasks";
import type { TaskResponse, TasksResponse } from "./types/api";
import type { CreateTask, Task } from "./types/task";


const app = express();
app.use(express.json());

const PORT = 5000;



app.get("/", (_req, res) => {
    res.json({
        message: "TaskFlow API is running",
    });
});


app.get("/tasks", (_req, res) => {
    const response: TasksResponse = {
        success: true,
        data: tasks,
    };

    res.json(response);
});


app.post("/tasks", (req, res) => {
    const newTaskData = req.body as CreateTask;

    const newTask: Task = {
        ...newTaskData,
        id: crypto.randomUUID(),
    };

    tasks.push(newTask);

    const response: TaskResponse = {
        success: true,
        data: newTask,
    };

    res.status(201).json(response);
});


app.patch("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const updates = req.body as Partial<Task>;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        res.status(404).json({
            success: false,
            data: null,
            message: "Task not found",
        });
        return;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updates,
    };

    const response: TaskResponse = {
        success: true,
        data: tasks[taskIndex],
    };

    res.json(response);
});



app.listen(PORT, () => {
    console.log(`TaskFlow server running on port ${PORT}`);
});
