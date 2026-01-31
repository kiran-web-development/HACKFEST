import React, { useState } from 'react';
import { useWaste } from '../waste/useWaste';
import WasteStats from '../waste/WasteStats';
import WasteByReasonChart from '../reports/charts/WasteByReasonChart';
import WasteByCategoryChart from '../reports/charts/WasteByCategoryChart';
import WasteTrendChart from '../reports/charts/WasteTrendChart';

export default function Reports() {
    const { logs, getStats, loading } = useWaste();
    const [activeTab, setActiveTab] = useState('overview');

    if (loading) return <div>Loading reports...</div>;

    const stats = getStats();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-500">Visualize your waste patterns and impact.</p>
                </div>

                <div className="bg-white p-1 rounded-lg border border-gray-200 flex space-x-1">
                    {['overview', 'trends', 'financial'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${activeTab === tab
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <WasteStats stats={stats} />

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Waste by Reason</h3>
                        <WasteByReasonChart logs={logs} />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Waste by Category</h3>
                        <WasteByCategoryChart logs={logs} />
                    </div>
                </div>
            )}

            {(activeTab === 'trends' || activeTab === 'financial') && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Waste & Cost Over Time</h3>
                    <WasteTrendChart logs={logs} />
                </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Insight</h4>
                <p className="text-sm text-blue-600">
                    Reducing your waste by just 20% compared to last month could save you approximately ${(stats.totalCost * 0.2).toFixed(2)} and prevent {(stats.totalCarbon * 0.2).toFixed(2)} kg of CO2e.
                </p>
            </div>
        </div>
    );
}
