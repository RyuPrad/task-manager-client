import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../hooks/useTasks';

export default function Dashboard() {
  const { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    let params = '?';
    if (newFilter === 'completed') params += 'completed=true&';
    if (newFilter === 'active') params += 'completed=false&';
    if (search) params += `search=${search}&`;
    fetchTasks(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let params = '?';
    if (filter === 'completed') params += 'completed=true&';
    if (filter === 'active') params += 'completed=false&';
    if (search) params += `search=${search}&`;
    fetchTasks(params);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <TaskForm onSubmit={createTask} />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="join w-full">
            <input
              type="text"
              placeholder="Search tasks..."
              className="input input-bordered join-item w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary join-item">
              Search
            </button>
          </div>
        </form>

        <div className="join">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`btn join-item btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => handleFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Task List */}
      {!loading && (
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p className="text-lg">No tasks found</p>
              <p className="text-sm">Create your first task above</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={!pagination.has_prev}
              onClick={() => fetchTasks(`?page=${pagination.page - 1}`)}
            >
              «
            </button>
            <button className="join-item btn btn-sm">
              Page {pagination.page} of {pagination.total_pages}
            </button>
            <button
              className="join-item btn btn-sm"
              disabled={!pagination.has_next}
              onClick={() => fetchTasks(`?page=${pagination.page + 1}`)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}