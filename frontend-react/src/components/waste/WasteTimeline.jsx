import React from 'react';
import WasteItem from './WasteItem';

export default function WasteTimeline({ logs }) {
    // Group logs by date
    const groupedLogs = logs.reduce((acc, log) => {
        const date = new Date(log.date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedLogs).sort((a, b) => new Date(b) - new Date(a));

    if (logs.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No waste entries yet. Keep it up!
            </div>
        );
    }

    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {sortedDates.map((date) => (
                <div key={date} className="relative z-10">
                    <div className="sticky top-0 z-20 flex items-center justify-center mb-4">
                        <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
                            {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    <div className="space-y-4 px-4 sm:px-0 max-w-2xl mx-auto">
                        {groupedLogs[date].map((log) => (
                            <WasteItem key={log.id} log={log} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
