import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RetailWidget() {
    // Mock data for retail specific metrics
    const data = [
        { name: 'Dairy', sales: 4000, waste: 240 },
        { name: 'Produce', sales: 3000, waste: 450 },
        { name: 'Bakery', sales: 2000, waste: 300 },
        { name: 'Meat', sales: 2780, waste: 200 },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
                    Sales vs Waste
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Retail</span>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="waste" fill="#ef4444" name="Waste ($)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Shelf Life Efficiency</p>
                    <p className="text-lg font-bold text-gray-900">8.5 days</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Markdown Capture</p>
                    <p className="text-lg font-bold text-green-600">65%</p>
                </div>
            </div>
        </div>
    );
}
