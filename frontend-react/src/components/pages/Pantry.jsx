import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PantryList from '../pantry/PantryList';
import PantryFilters from '../pantry/PantryFilters';
import AddItemModal from '../pantry/AddItemModal';
import { usePantry } from '../pantry/usePantry';
import { useWaste } from '../waste/useWaste';
import LogWasteModal from '../waste/LogWasteModal';
import { useNavigate } from 'react-router-dom';

export default function Pantry() {
    const { items, addItem, updateItem, deleteItem, loading } = usePantry();
    const { addLog } = useWaste();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWasteModalOpen, setIsWasteModalOpen] = useState(false);
    const [wasteItem, setWasteItem] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('expiry_asc');

    const handleSave = (itemData) => {
        if (editingItem) {
            updateItem(editingItem.id, itemData);
        } else {
            addItem(itemData);
        }
        setEditingItem(null);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteItem(id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleLogWaste = (item) => {
        setWasteItem({
            itemName: item.name,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            reason: 'Expired',
            cost: '',
            date: new Date().toISOString().split('T')[0]
        });
        setIsWasteModalOpen(true);
    };

    const handleSaveWaste = (logData) => {
        addLog(logData);
        // Optional: Remove from pantry after logging waste
        if (window.confirm('Do you want to remove this item from the pantry since it was logged as waste?')) {
            // Find item ID by name (simplified for now, ideally pass ID)
            const item = items.find(i => i.name === logData.itemName);
            if (item) deleteItem(item.id);
        }
        setIsWasteModalOpen(false);
        setWasteItem(null);
        navigate('/waste'); // Redirect to waste log to see entry
    };

    // Filter and Sort Logic
    const filteredItems = items
        .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'All' || item.category === category;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sort) {
                case 'expiry_asc':
                    return new Date(a.expiryDate) - new Date(b.expiryDate);
                case 'expiry_desc':
                    return new Date(b.expiryDate) - new Date(a.expiryDate);
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

    if (loading) return <div>Loading pantry...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pantry Management</h1>
                    <p className="text-gray-500">Track your inventory and reduce waste.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Item
                </button>
            </div>

            <PantryFilters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
            />

            <PantryList
                items={filteredItems}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLogWaste={handleLogWaste}
            />

            <AddItemModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                initialData={editingItem}
            />

            <LogWasteModal
                isOpen={isWasteModalOpen}
                onClose={() => setIsWasteModalOpen(false)}
                onSave={handleSaveWaste}
                prefillData={wasteItem}
            />
        </div>
    );
}
