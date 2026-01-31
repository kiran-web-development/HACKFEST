import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function WasteByReasonChart({ logs }) {
    // Aggregate data by reason
    const data = Object.values(logs.reduce((acc, log) => {
        const reason = log.reason || 'Unknown';
        if (!acc[reason]) {
            acc[reason] = { name: reason, value: 0 };
        }
        // Standardize to kg for aggregation
        let weight = parseFloat(log.quantity);
        if (log.unit === 'g' || log.unit === 'ml') weight /= 1000;
        if (log.unit === 'pcs') weight *= 0.15;

        acc[reason].value += weight;
        return acc;
    }, {}));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

    if (data.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)} kg`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
