// Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register({ setRegistered }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:3001/register', { username, password });
            setRegistered(true); // Notify parent that registration is complete
            alert('Registration successful! Please log in.');
        } catch (error) {
            console.error('Registration failed!', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="registerContainer">
            <h1>Register to ZapChirp</h1>
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;