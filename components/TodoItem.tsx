import { Todo, TodoItemProps } from '../types/todo';

// TodoItem.tsx
export default function TodoItem({ todo, onMarkDone, onDelete, onMarkInProgress }: TodoItemProps) {
  return (
    <li className="grid grid-cols-4 items-center px-4 py-3 bg-white transition">
      <span className="truncate">{todo.title}</span>
      <span className="truncate text-sm text-gray-600">{todo.description || "No description"}</span>
      <span
        className={`text-xs font-medium ${todo.status === "PENDING"
          ? "text-yellow-600"
          : todo.status === "IN_PROGRESS"
            ? "text-blue-600"
            : "text-green-600"
          }`}
      >
        {todo.status.replace("_", " ")}
      </span>
      <div className="flex gap-2">
        {todo.status === "PENDING" && (
          <button
            onClick={() => onMarkInProgress(todo.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            In Progress
          </button>
        )}
        {todo.status === "IN_PROGRESS" && (
          <button
            onClick={() => onMarkDone(todo.id)}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
          >
            Done
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
