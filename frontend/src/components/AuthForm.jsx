// FILE: frontend/src/components/AuthForm.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css'; // Will create this file next

const AuthForm = () => {
    const { login, register, error } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ 
        email: '', 
        password: '', 
        first_name: '' 
    });
    const [localError, setLocalError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalError(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null); // Clear previous errors

        if (!form.email || !form.password || (!isLogin && !form.first_name)) {
            setLocalError('All fields are required.');
            return;
        }

        try {
            if (isLogin) {
                // Call the login function from AuthContext
                await login(form.email, form.password);
            } else {
                // Call the register function from AuthContext
                await register(form);
            }
        } catch (err) {
            // Error is handled/set in the context, but we use a local state for immediate feedback
            // The global 'error' will contain the API message (e.g., 'Invalid credentials')
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
            {(localError || error) && (
                <div className="error-message">Error: {localError || error}</div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <input 
                        type="text" 
                        name="first_name"
                        placeholder="Your First Name (e.g., Stephen)"
                        value={form.first_name}
                        onChange={handleChange}
                    />
                )}
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>

            <button 
                className="toggle-button"
                onClick={() => {
                    setIsLogin(!isLogin);
                    setLocalError(null);
                }}
            >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default AuthForm;