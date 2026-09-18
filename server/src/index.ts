import express from "express";
import cors from "cors";
import "dotenv/config";

import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

app.get("/", (_req, res) => {
    res.json({
        message: "TaskFlow API is running",
    });
});

app.use("/tasks", taskRoutes);

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
