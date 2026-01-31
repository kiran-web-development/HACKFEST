import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import WasteStats from '../waste/WasteStats';
import WasteTimeline from '../waste/WasteTimeline';
import LogWasteModal from '../waste/LogWasteModal';
import { useWaste } from '../waste/useWaste';

export default function WasteLogs() {
    const { logs, addLog, getStats, loading } = useWaste();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = getStats();

    const handleSave = (logData) => {
        addLog(logData);
    };

    if (loading) return <div>Loading waste logs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Waste Log</h1>
                    <p className="text-gray-500">Track and analyze your food waste to save money.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Log Waste
                </button>
            </div>

            <WasteStats stats={stats} />

            <h2 className="text-lg font-medium text-gray-900">History</h2>
            <WasteTimeline logs={logs} />

            <LogWasteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
