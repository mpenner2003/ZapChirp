// Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login({ setLoggedIn, setToken, setShowRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            setToken(response.data.token);
            setLoggedIn(true);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="loginContainer">
            <h1>Input your Zap Credentials</h1>
            <input
                type="text"
                placeholder="Username..."
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Password..."
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <button onClick={() => setShowRegister(true)}>Register here to start zapping</button></p>
        </div>
    );
}

export default Login;