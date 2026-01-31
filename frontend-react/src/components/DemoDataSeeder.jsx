import React, { useState } from 'react';
import { Database, Check, RefreshCw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoDataSeeder() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const seedData = () => {
        if (!window.confirm("This will overwrite all current data with demo data. Continue?")) return;

        setLoading(true);

        // 1. Clear existing data
        localStorage.clear();

        // 2. Auth / User
        const user = {
            email: 'demo@ecopantry.com',
            name: 'Demo User',
            organization: { id: 'org_1', name: 'Green Bistro' },
            organizationType: 'Hospitality'
        };
        localStorage.setItem('foodwaste_user', JSON.stringify(user));
        localStorage.setItem('foodwaste_org_type', 'Hospitality');

        // 3. Pantry Items
        const today = new Date();
        const threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 3);
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 2);

        const pantry = [
            { id: '1', name: 'Organic Milk', category: 'Dairy', quantity: '2 Gallons', expiryDate: threeDaysFromNow.toISOString(), addedDate: new Date().toISOString() },
            { id: '2', name: 'Spinach', category: 'Produce', quantity: '5 Bags', expiryDate: pastDate.toISOString(), addedDate: new Date().toISOString() },
            { id: '3', name: 'Chicken Breast', category: 'Meat', quantity: '10 lbs', expiryDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), addedDate: new Date().toISOString() },
            { id: '4', name: 'Sourdough Bread', category: 'Bakery', quantity: '15 Loaves', expiryDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), addedDate: new Date().toISOString() },
        ];
        localStorage.setItem('foodwaste_pantry', JSON.stringify(pantry));

        // 4. Waste Logs
        const wasteLogs = [
            { id: '1', itemName: 'Tomatoes', category: 'Produce', quantity: '2 kg', reason: 'Spoilage', cost: 15, date: pastDate.toISOString() },
            { id: '2', itemName: 'Milk', category: 'Dairy', quantity: '1 liter', reason: 'Expired', cost: 5, date: new Date().toISOString() },
            { id: '3', itemName: 'Bread Trimmings', category: 'Bakery', quantity: '3 kg', reason: 'Preparation', cost: 0, date: new Date().toISOString() } // Low cost prep waste
        ];
        localStorage.setItem('foodwaste_logs', JSON.stringify(wasteLogs));

        // 5. Donations
        const donations = [
            { id: '1', itemName: 'Canned Soup', category: 'Canned', quantity: '20 cans', expiryDate: '2025-12-31', donorName: 'Community Center', distance: 2, status: 'available', postedDate: new Date().toISOString() },
            { id: '2', itemName: 'Fresh Apples', category: 'Produce', quantity: '1 crate', expiryDate: threeDaysFromNow.toISOString(), donorName: 'Orchard Farm', distance: 5, status: 'available', postedDate: new Date().toISOString() },
        ];
        localStorage.setItem('foodwaste_donations', JSON.stringify(donations));

        // 6. Suppliers
        const suppliers = [
            { id: '1', name: 'FarmFresh Co.', category: 'Produce', contactPerson: 'John Doe', email: 'john@farmfresh.com', phone: '555-0123', rating: 4.8, joinedDate: '2024-01-10' },
            { id: '2', name: 'Metro Dairy', category: 'Dairy', contactPerson: 'Jane Smith', email: 'orders@metrodairy.com', phone: '555-9876', rating: 3.5, joinedDate: '2024-02-15' },
        ];
        localStorage.setItem('foodwaste_suppliers', JSON.stringify(suppliers));

        // 7. Team
        const team = [
            { id: '1', name: 'Chef Mario', email: 'mario@greenbistro.com', role: 'Manager', status: 'Active', joinedDate: '2023-05-01', avatar: 'M' },
            { id: '2', name: 'Sous Chef Luigi', email: 'luigi@greenbistro.com', role: 'Staff', status: 'Active', joinedDate: '2023-06-15', avatar: 'L' },
        ];
        localStorage.setItem('foodwaste_team', JSON.stringify(team));

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                window.location.reload(); // Reload to refresh contexts
            }, 1000);
        }, 800);
    };

    const clearData = () => {
        if (!window.confirm("This will simply WIPE all data. Continue?")) return;
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
            <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                <Database className="h-5 w-5 mr-2 text-indigo-500" />
                Demo Data Control
            </h3>
            <p className="text-sm text-gray-500 mb-4">
                Use these tools to populate the application with data for demonstrations or to reset the state.
            </p>

            <div className="flex space-x-4">
                <button
                    onClick={seedData}
                    disabled={loading}
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                >
                    {loading ? <RefreshCw className="animate-spin h-4 w-4 mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    {success ? 'Data Seeded!' : 'Seed Demo Data'}
                </button>

                <button
                    onClick={clearData}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Data
                </button>
            </div>
        </div>
    );
}
