import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WasteTrendChart({ logs }) {
    // Group by date and sum waste
    const groupedData = logs.reduce((acc, log) => {
        const date = new Date(log.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { date, waste: 0, cost: 0 };
        }

        let weight = parseFloat(log.quantity);
        if (log.unit === 'g' || log.unit === 'ml') weight /= 1000;
        if (log.unit === 'pcs') weight *= 0.15;

        acc[date].waste += weight;
        acc[date].cost += parseFloat(log.cost || 0);
        return acc;
    }, {});

    // Convert to array and sort by date
    // Ensure we have at least some data points
    const data = Object.values(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date));

    if (data.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400">No data available</div>;
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Area yAxisId="left" type="monotone" dataKey="waste" name="Waste (kg)" stroke="#ef4444" fill="#fee2e2" />
                    <Area yAxisId="right" type="monotone" dataKey="cost" name="Cost ($)" stroke="#82ca9d" fill="#dcfce7" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
