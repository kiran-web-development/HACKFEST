import React from 'react';
import PantryItem from './PantryItem';
import { PackageOpen } from 'lucide-react';

export default function PantryList({ items, onDelete, onEdit, onLogWaste }) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by adding some items to your pantry.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <PantryItem
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onLogWaste={onLogWaste}
                />
            ))}
        </div>
    );
}
