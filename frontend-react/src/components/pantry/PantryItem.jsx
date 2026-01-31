import React from 'react';
import { Clock, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function PantryItem({ item, onDelete, onEdit, onLogWaste }) {
    const getExpiryStatus = (date) => {
        const now = new Date();
        const expiry = new Date(date);
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { color: 'bg-red-50 text-red-700 border-red-200', text: 'Expired', icon: 'text-red-500' };
        if (diffDays <= 3) return { color: 'bg-orange-50 text-orange-700 border-orange-200', text: 'Expiring soon', icon: 'text-orange-500' };
        return { color: 'bg-green-50 text-green-700 border-green-200', text: 'Good', icon: 'text-green-500' };
    };

    const status = getExpiryStatus(item.expiryDate);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                        {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(item)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Quantity</span>
                    <span className="font-medium text-gray-900">{item.quantity} {item.unit}</span>
                </div>

                <div className={cn("px-2 py-1 rounded-md border flex items-center space-x-1.5", status.color)}>
                    <Clock className={cn("h-3.5 w-3.5", status.icon)} />
                    <span className="text-xs font-medium">{new Date(item.expiryDate).toLocaleDateString()}</span>
                </div>
            </div>

            {status.text === 'Expired' && (
                <div className="mt-3 flex items-center justify-between text-xs text-red-600 bg-red-50 p-2 rounded">
                    <div className="flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1.5" />
                        <span>Consider logging as waste</span>
                    </div>
                    {onLogWaste && (
                        <button
                            onClick={() => onLogWaste(item)}
                            className="text-red-700 underline hover:text-red-800 font-medium"
                        >
                            Log Waste
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
