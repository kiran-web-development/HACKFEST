import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function WasteByCategoryChart({ logs }) {
    // Aggregate data by category
    const data = Object.values(logs.reduce((acc, log) => {
        const category = log.category || 'Other';
        if (!acc[category]) {
            acc[category] = { name: category, mass: 0 };
        }
        // Standardize to kg
        let weight = parseFloat(log.quantity);
        if (log.unit === 'g' || log.unit === 'ml') weight /= 1000;
        if (log.unit === 'pcs') weight *= 0.15;

        acc[category].mass += weight;
        return acc;
    }, {}));

    if (data.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" unit="kg" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)} kg`} />
                    <Legend />
                    <Bar dataKey="mass" name="Waste (kg)" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
