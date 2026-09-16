import express from "express";

import { tasks } from "./data/tasks";
import type { TaskResponse, TasksResponse } from "./types/api";
import type { Task } from "./types/task";
import {
    isCreateTask,
    isTaskUpdate,
} from "./utils/validation";
import "dotenv/config";
import cors from "cors";



const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;


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
    const newTaskData: unknown = req.body;

    if (!isCreateTask(newTaskData)) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Invalid task data",
        });
        return;
    }

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
    const updates: unknown = req.body;

    if (!isTaskUpdate(updates)) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Invalid task update data",
        });

        return;
    }

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

app.delete("/tasks/:id", (req, res) => {
    const taskId = req.params.id;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        res.status(404).json({
            success: false,
            data: null,
            message: "Task not found",
        });
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    const response: TaskResponse = {
        success: true,
        data: deletedTask,
    };

    res.json(response);
});


app.use((_req, res) => {
    res.status(404).json({
        success: false,
        data: null,
        message: "Route not found",
    });
});

app.listen(PORT, () => {
    console.log(`TaskFlow server running on port ${PORT}`);
});
