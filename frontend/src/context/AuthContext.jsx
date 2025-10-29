// FILE: frontend/src/context/AuthContext.jsx (FINAL VERSION)

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// CRITICAL FIX: Define the absolute URL for the live Render API
const BASE_API_URL = 'https://water-tracker-api-live.onrender.com'; 

// Custom hook to use authentication
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up Axios interceptor to include the token in all requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Failed to parse user data from localStorage", e);
            logout();
        }
    }
    setLoading(false);
  }, []);

  // --- API Functions ---

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // FIX: Use the absolute URL for production requests
      const res = await axios.post(`${BASE_API_URL}/api/auth/login`, { email, password });
      
      const { user_id, first_name, email: userEmail, token: jwtToken } = res.data;
      
      const userData = { user_id, first_name, email: userEmail };
      
      setUser(userData);
      setToken(jwtToken);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', jwtToken);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed due to network error.';
      setError(errorMessage);
      logout();
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      // FIX: Use the absolute URL for production requests
      await axios.post(`${BASE_API_URL}/api/auth/register`, userData);
      // After successful registration, log the user in immediately
      await login(userData.email, userData.password);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};