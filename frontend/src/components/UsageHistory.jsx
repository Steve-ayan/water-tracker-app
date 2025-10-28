// FILE: frontend/src/components/UsageHistory.jsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UsageHistory = ({ logs }) => {
    if (!logs || logs.length === 0) {
        return <p>No usage data logged yet. Log your first entry above!</p>;
    }

    // Format data for the chart: { name: 'Date', usage: 350.50 }
    const chartData = logs.map(log => ({
        name: new Date(log.log_date).toLocaleDateString(),
        usage: parseFloat(log.total_usage_l),
    })).reverse(); // Reverse to show oldest data on the left of the chart

    return (
        <div className="history-container">
            {/* Chart Area */}
            <div style={{ width: '100%', height: 300, marginBottom: '20px' }}>
                <h4>Last {logs.length} Days of Usage</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Liters (L)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value.toFixed(2)} L`, 'Usage']} />
                        <Line type="monotone" dataKey="usage" stroke="#007bff" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Table Area */}
            <h4>Raw Data Table</h4>
            <table className="usage-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Usage (L)</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.log_id}>
                            <td>{new Date(log.log_date).toLocaleDateString()}</td>
                            <td>{parseFloat(log.total_usage_l).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsageHistory;