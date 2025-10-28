// FILE: frontend/src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import UsageHistory from '../components/UsageHistory'; // Will create this next
import UsageLogger from '../components/UsageLogger';   // Will create this next

const Dashboard = () => {
    const { user, token } = useAuth(); // Get user info and token automatically
    const [usageLogs, setUsageLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [logError, setLogError] = useState(null);

    // --- 1. Fetch Data Function ---
    const fetchUsageHistory = async () => {
        setIsLoading(true);
        try {
            // Note: Axios automatically includes the Authorization header via AuthContext
            const res = await axios.get('/api/usage/history');
            setUsageLogs(res.data);
            setLogError(null);
        } catch (error) {
            setLogError('Failed to load usage history.');
            console.error('Fetch History Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. Log Data Function ---
    const handleLogUsage = async (usageAmount) => {
        try {
            const res = await axios.post('/api/usage/log', { totalUsageL: usageAmount });
            
            // On successful log, refresh the history immediately
            fetchUsageHistory(); 
            return res.data.message; // Return success message
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Logging failed.';
            setLogError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        if (token) {
            fetchUsageHistory();
        }
    }, [token]);

    return (
        <div className="dashboard-container">
            <h2>Welcome back, {user?.first_name || 'User'}!</h2>
            
            {logError && <div className="error-message">{logError}</div>}
            
            {/* The component to input new data */}
            <UsageLogger onLog={handleLogUsage} />

            {/* Display loading or the history */}
            <hr />
            <h3>Your Consumption History (Liters)</h3>
            {isLoading ? (
                <p>Loading usage history...</p>
            ) : (
                <UsageHistory logs={usageLogs} />
            )}
        </div>
    );
};

export default Dashboard;