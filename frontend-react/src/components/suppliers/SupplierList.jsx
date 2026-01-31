import React from 'react';
import SupplierCard from './SupplierCard';
import { Truck } from 'lucide-react';

export default function SupplierList({ suppliers, onEdit, onDelete }) {
    if (suppliers.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                <Truck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No suppliers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first supplier.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
                <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
