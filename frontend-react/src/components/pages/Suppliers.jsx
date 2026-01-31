import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useSuppliers } from '../suppliers/useSuppliers';
import SupplierList from '../suppliers/SupplierList';
import AddSupplierModal from '../suppliers/AddSupplierModal';

export default function Suppliers() {
    const { suppliers, addSupplier, updateSupplier, deleteSupplier, loading } = useSuppliers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <div>Loading suppliers...</div>;

    const handleSave = (supplierData) => {
        if (editingSupplier) {
            updateSupplier(editingSupplier.id, supplierData);
        } else {
            addSupplier(supplierData);
        }
        setEditingSupplier(null);
    };

    const handleEdit = (supplier) => {
        setEditingSupplier(supplier);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            deleteSupplier(id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSupplier(null);
    };

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
                    <p className="text-gray-500">Track and evaluate your food sources.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Supplier
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search suppliers by name or category..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <SupplierList
                suppliers={filteredSuppliers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AddSupplierModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                initialData={editingSupplier}
            />
        </div>
    );
}
