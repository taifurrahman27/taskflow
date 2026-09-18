import { Router } from "express";

import { tasks } from "../data/tasks";
import type { TaskResponse } from "../types/api";
import type { Task } from "../types/task";
import { isCreateTask, isTaskUpdate } from "../utils/validation";

const router = Router();

router.get("/", (_req, res) => {
    const response: {
        success: true;
        data: Task[];
    } = {
        success: true,
        data: tasks,
    };

    res.json(response);
});

router.get("/:id", (req, res) => {
    const taskId = req.params.id;

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        res.status(404).json({
            success: false,
            data: null,
            message: "Task not found",
        });
        return;
    }

    const response: TaskResponse = {
        success: true,
        data: task,
    };

    res.json(response);
});

router.post("/", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

export default router;
