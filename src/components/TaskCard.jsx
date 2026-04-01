import { useState } from 'react';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    await onUpdate(task.id, { completed: !task.completed });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(task.id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div className={`card bg-base-200 shadow-sm ${task.completed ? 'opacity-60' : ''}`}>
      <div className="card-body p-4 flex-row items-center gap-4">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={task.completed}
          onChange={handleToggle}
        />

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-base-content/60 truncate">{task.description}</p>
          )}
          <p className="text-xs text-base-content/40 mt-1">
            {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          className="btn btn-ghost btn-sm btn-square text-error"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}