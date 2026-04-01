import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks(params);
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (task) => {
    const newTask = await api.createTask(task);
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = async (id, updates) => {
    const updated = await api.updateTask(id, updates);
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteTask = async (id) => {
    await api.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask };
}