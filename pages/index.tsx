import { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo, TodoStatus } from '../types/todo';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_JWT_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('ALL');
  const [log, setLog] = useState<string[]>([]);

  const addLog = (m: string) => setLog(prev => [new Date().toLocaleTimeString() + ': ' + m, ...prev].slice(0, 50));

  const fetchTodos = async () => {
    try {
      setLoading(true);
      addLog('Fetching todos');
      const params = filter === 'ALL' ? {} : { status: filter };
      const res = await axios.get(`${API_URL}/todos`, { params, headers });
      setTodos(res.data);
      addLog('Fetched todos: ' + res.data.length);
    } catch (err: any) {
      addLog('Fetch error: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, [filter]);

  const handleCreate = async (title: string, description?: string) => {
    try {
      addLog('Creating todo');
      const res = await axios.post(`${API_URL}/todos`, { title, description }, { headers: headers });
      addLog('Created todo');
      setTodos(prev => [res.data, ...prev]);
    } catch (err: any) {
      addLog('Create error: ' + (err.message || err));
    }
  };

  const handleMarkDone = async (id: string) => {
    try {
      addLog('Updating todo to DONE ' + id);
      const res = await axios.put(`${API_URL}/todos/${id}`, { status: TodoStatus.DONE }, { headers: headers });
      setTodos(prev => prev.map(t => t.id === id ? res.data : t));
      addLog('Updated todo ' + id);
    } catch (err: any) {
      addLog('Update error: ' + (err.message || err));
    }
  };

  const handleInProgress = async (id: string) => {
    try {
      addLog('Updating todo to InProgress ' + id);
      const res = await axios.put(`${API_URL}/todos/${id}`, { status: TodoStatus.IN_PROGRESS }, { headers: headers });
      setTodos(prev => prev.map(t => t.id === id ? res.data : t));
      addLog('Updated todo ' + id);
    } catch (err: any) {
      addLog('Update error: ' + (err.message || err));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      addLog('Deleting todo ' + id);
      await axios.delete(`${API_URL}/todos/${id}`, { headers: headers });
      setTodos(prev => prev.filter(t => t.id !== id));
      addLog('Deleted todo ' + id);
    } catch (err: any) {
      addLog('Delete error: ' + (err.message || err));
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>To-Do App</h1>
      <div className='mb-4 flex gap-2'>
        <select value={filter} onChange={e => setFilter(e.target.value)} className='px-2 py-1 border rounded'>
          <option value='ALL'>All</option>
          <option value='PENDING'>Pending</option>
          <option value='IN_PROGRESS'>In Progress</option>
          <option value='DONE'>Done</option>
        </select>
        <button onClick={fetchTodos} className='px-3 py-1 bg-gray-200 rounded'>Refresh</button>
      </div>

      <TodoForm onCreate={handleCreate} />

      <div className='mt-10'>
        <h2 className='font-medium'>To-Do List</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="w-full border rounded-lg divide-y divide-gray-200">
            {/* Header row */}
            <li className="grid grid-cols-4 bg-gray-100 px-4 py-2 font-semibold text-gray-700">
              <span>Title</span>
              <span>Description</span>
              <span>Status</span>
              <span>Actions</span>
            </li>

            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onMarkDone={handleMarkDone}
                onDelete={handleDelete}
                onMarkInProgress={handleInProgress}
              />
            ))}
          </ul>
        )}
      </div>

      <div className='mt-8'>
        <h2 className='font-medium'>Activity Log</h2>
        <div className='mt-2 bg-white p-3 rounded shadow h-40 overflow-auto'>
          {log.map((l, idx) => <div key={idx} className='text-sm text-gray-600'>{l}</div>)}
        </div>
      </div>
    </div>
  )
}
