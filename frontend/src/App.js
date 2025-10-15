import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [view, setView] = useState('login'); // login/register

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setView('login');
    };

    if (token) return <Dashboard token={token} logout={logout} />;

    return view === 'login' 
        ? <Login setToken={setToken} setView={setView} /> 
        : <Register setView={setView} />;
}

export default App;
