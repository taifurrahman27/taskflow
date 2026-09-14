import { useState, type FormEvent } from "react";
import type { CreateTask } from "../types/task";

type TaskFormProps = {
    onAddTask: (task: CreateTask) => void;
};

function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] =
        useState<CreateTask["priority"]>("medium");
    const [category, setCategory] =
        useState<CreateTask["category"]>("personal");

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        const newTask: CreateTask = {
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
                        setPriority(
                            event.target.value as CreateTask["priority"]
                        )
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
                        setCategory(
                            event.target.value as CreateTask["category"]
                        )
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
