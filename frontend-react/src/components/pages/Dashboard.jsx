import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePantry } from '../pantry/usePantry';
import { useWaste } from '../waste/useWaste';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HospitalityWidget from '../dashboard/HospitalityWidget';
import RetailWidget from '../dashboard/RetailWidget';

export default function Dashboard() {
    const { user } = useAuth();
    const { items } = usePantry();
    const { getStats } = useWaste();

    const wasteStats = getStats();
    const expiringItems = items.filter(item => {
        const days = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        return days <= 3 && days >= 0;
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {user?.name}</p>
                </div>
                <Link to="/pantry" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
                    Manage Pantry <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Pantry Items</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{items.length}</p>
                    <p className="text-green-600 text-sm mt-2">{expiringItems.length} expiring soon</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Waste Logged</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{wasteStats.totalWaste} kg</p>
                    <p className="text-green-600 text-sm mt-2">Valued at ${wasteStats.totalCost}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Carbon Impact</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{wasteStats.totalCarbon} kg</p>
                    <p className="text-green-600 text-sm mt-2">CO2e generated</p>
                </div>
            </div>

            {/* Sector Specific Widgets */}
            {user?.organizationType === 'Hospitality' && <HospitalityWidget />}
            {user?.organizationType === 'Retail' && <RetailWidget />}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Expiring Soon</h3>
                    {expiringItems.length === 0 ? (
                        <p className="text-gray-500 text-sm">No items expiring in the next 3 days.</p>
                    ) : (
                        <div className="space-y-3">
                            {expiringItems.slice(0, 5).map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                    <span className="text-red-600 text-sm font-medium">
                                        {new Date(item.expiryDate).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="text-lg font-medium text-green-900 mb-2">Quick Tip</h3>
                    <p className="text-green-700">
                        Did you know? Storing potatoes with apples keeps them from sprouting correctly! Keep them separated to extend shelf life.
                    </p>
                    <div className="mt-4">
                        <Link to="/reports" className="text-sm font-bold text-green-800 hover:text-green-900 underline">
                            View detailed analytics
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}
