import { useState, type FormEvent } from "react";
import type { Task } from "../types/task";

type TaskFormProps = {
    onAddTask: (task: Task) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Task["priority"]>("medium");
    const [category, setCategory] =
        useState<Task["category"]>("personal");

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            priority,
            completed: false,
            category,
            createdAt: new Date().toISOString(),
        };

        onAddTask(newTask);

        setTitle("");
        setPriority("medium");
        setCategory("personal");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Task title</label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter a task"
                />
            </div>

            <div>
                <label htmlFor="priority">Priority</label>

                <select
                    id="priority"
                    value={priority}
                    onChange={(event) =>
                        setPriority(event.target.value as Task["priority"])
                    }
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div>
                <label htmlFor="category">Category</label>

                <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value as Task["category"])
                    }
                >
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="personal">Personal</option>
                </select>
            </div>

            <button type="submit">Add task</button>
        </form>
    );
}

export default TaskForm;
