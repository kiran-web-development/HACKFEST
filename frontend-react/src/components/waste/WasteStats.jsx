import React from 'react';
import { DollarSign, Scale, Leaf } from 'lucide-react';

export default function WasteStats({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center mb-0">
                <div className="rounded-full bg-red-100 p-3 mr-4">
                    <Scale className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Waste</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalWaste} kg</p>
                    <p className="text-xs text-red-500 mt-1">Total accumulated</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                <div className="rounded-full bg-yellow-100 p-3 mr-4">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Value Lost</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalCost}</p>
                    <p className="text-xs text-yellow-500 mt-1">Estimated cost</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Carbon Impact</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCarbon} kg</p>
                    <p className="text-xs text-green-500 mt-1">CO2 equivalent</p>
                </div>
            </div>
        </div>
    );
}
