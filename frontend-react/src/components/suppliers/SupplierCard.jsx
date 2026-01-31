import React from 'react';
import { Phone, Mail, User, Star, Edit2, Trash2 } from 'lucide-react';

export default function SupplierCard({ supplier, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                        {supplier.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{supplier.name}</h3>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(supplier)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(supplier.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {supplier.contactPerson}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {supplier.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {supplier.email}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{supplier.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">Quality Score</span>
                </div>
                <div className="text-xs text-gray-400">
                    Joined {new Date(supplier.joinedDate).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
