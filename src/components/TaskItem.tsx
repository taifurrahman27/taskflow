import type { Task } from "../types/task";

type TaskItemProps = {
    task: Task;
};

function TaskItem({ task }: TaskItemProps) {
    return (
        <article>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <p>{task.completed ? "Completed" : "Not completed"}</p>
        </article>
    );
}

export default TaskItem;