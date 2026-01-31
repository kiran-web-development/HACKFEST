import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UtensilsCrossed } from 'lucide-react';

export default function HospitalityWidget() {
    // Mock data for hospitality specific waste
    const data = [
        { name: 'Prep Waste', value: 45 },
        { name: 'Plate Waste', value: 30 },
        { name: 'Spoilage', value: 15 },
        { name: 'Other', value: 10 },
    ];

    const COLORS = ['#0ea5e9', '#f97316', '#ef4444', '#a8a29e'];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <UtensilsCrossed className="h-5 w-5 mr-2 text-orange-500" />
                    Kitchen Waste Breakdown
                </h3>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">Hospitality</span>
            </div>

            <div className="flex flex-col md:flex-row items-center">
                <div className="h-48 w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Cost per Cover</span>
                        <span className="font-bold text-gray-900">$0.45</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Prep Efficiency</span>
                        <span className="font-bold text-green-600">92%</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                        *Based on mock data for demonstration
                    </div>
                </div>
            </div>
        </div>
    );
}
