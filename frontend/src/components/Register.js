import { useState } from 'react';
import { register } from '../services/api';

export default function Register({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ username, password, role });
            setMessage(`User created: ${res.data.username}`);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <button onClick={() => setView('login')}>Login</button></p>
        </div>
    );
}
