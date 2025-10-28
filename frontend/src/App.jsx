// FILE: frontend/src/App.jsx

import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import AuthForm from './components/AuthForm';

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="app-container">
      <header>
        <h1>💧Water Tracker</h1>
        {user && <button onClick={logout}>Logout</button>}
      </header>
      
      <main>
        {user ? (
          <Dashboard />
        ) : (
          <AuthForm /> 
        )}
      </main>
    </div>
  );
}

// Export the App component (you don't need to change this part)
export default App;
