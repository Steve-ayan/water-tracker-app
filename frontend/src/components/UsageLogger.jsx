// FILE: frontend/src/components/UsageLogger.jsx

import React, { useState } from 'react';
import './UsageLogger.css'; // Will create this next

const UsageLogger = ({ onLog }) => {
    const [usage, setUsage] = useState('');
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setStatus('loading');

        const usageAmount = parseFloat(usage);

        if (isNaN(usageAmount) || usageAmount <= 0) {
            setMessage('Please enter a valid amount.');
            setStatus('error');
            return;
        }

        try {
            const successMessage = await onLog(usageAmount);
            setMessage(successMessage);
            setStatus('success');
            setUsage(''); // Clear input on success
        } catch (error) {
            setMessage(error.message || 'Logging failed.');
            setStatus('error');
        }
    };

    return (
        <div className="logger-container">
            <h3>Log Today's Water Usage</h3>
            
            <form onSubmit={handleSubmit} className="logger-form">
                <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Total Usage Today (Liters)"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    required
                    disabled={status === 'loading'}
                />
                <button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Logging...' : 'Log Usage'}
                </button>
            </form>

            {message && (
                <p className={`log-message ${status}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default UsageLogger;