import { useState, type FormEvent } from "react";

function TaskForm() {
    const [title, setTitle] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        console.log(title);

        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter a task"
            />

            <button type="submit">Add task</button>
        </form>
    );
}

export default TaskForm;
