import { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../services/api';

export default function Dashboard({ token, logout }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const fetchTasks = async () => {
        try {
            const res = await getTasks(token);
            setTasks(res.data);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error fetching tasks');
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleAdd = async () => {
        if (!title) return;
        try {
            await createTask(token, { title });
            setTitle('');
            fetchTasks();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error creating task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(token, id);
            fetchTasks();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error deleting task');
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={logout}>Logout</button>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <div>
                <input placeholder="New Task" value={title} onChange={e => setTitle(e.target.value)} />
                <button onClick={handleAdd}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} 
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
