// FILE: frontend/src/main.jsx (UPDATED)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx' // Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with the Auth Context */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)