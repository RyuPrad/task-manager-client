const API_URL = 'http://localhost:3000';

async function request(endpoint, options = {}) {
  const token = (await (await import('./supabase')).default.auth.getSession()).data.session?.access_token;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  getTasks: (params = '') => request(`/tasks${params}`),
  getTask: (id) => request(`/tasks/${id}`),
  createTask: (task) => request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  }),
  updateTask: (id, updates) => request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  deleteTask: (id) => request(`/tasks/${id}`, {
    method: 'DELETE',
  }),
};