import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (_req, res) => {
    res.json({
        message: "TaskFlow API is running",
    });
});

app.listen(PORT, () => {
    console.log(`TaskFlow server running on port ${PORT}`);
});