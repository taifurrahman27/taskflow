import type { Task } from "../types/task";

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

function TaskItem({
    task,
    onToggle,
    onDelete,
}: TaskItemProps) {
    return (
        <article>
            <h2>{task.title}</h2>

            {task.description && <p>{task.description}</p>}

            <p>Priority: {task.priority}</p>

            <p>Category: {task.category}</p>

            <p>
                Status: {task.completed ? "Completed" : "Not completed"}
            </p>

            <button onClick={() => onToggle(task.id)}>
                {task.completed ? "Mark incomplete" : "Mark complete"}
            </button>

            <button onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </article>
    );
}

export default TaskItem;
