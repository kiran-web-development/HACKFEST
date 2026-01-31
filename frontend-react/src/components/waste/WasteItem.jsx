import React from 'react';
import { Trash2, DollarSign, Clock } from 'lucide-react';

export default function WasteItem({ log }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                    <div className="bg-red-50 p-2 rounded-md">
                        <Trash2 className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{log.itemName}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{log.category}</span>
                            <span>{log.quantity} {log.unit}</span>
                            <span className="text-red-500 font-medium">{log.reason}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    {log.cost && (
                        <div className="flex items-center justify-end text-sm font-medium text-gray-900">
                            <DollarSign className="h-3 w-3 mr-0.5 text-gray-400" />
                            {parseFloat(log.cost).toFixed(2)}
                        </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                        {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        </div>
    );
}
