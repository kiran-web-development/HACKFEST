import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
    const { user, updateOrgType } = useAuth();
    const [activeType, setActiveType] = useState(user?.organizationType || 'General');
    const [message, setMessage] = useState('');

    const handleSave = () => {
        updateOrgType(activeType);
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <SettingsIcon className="h-8 w-8 text-gray-400" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Manage your organization profile and preferences.</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-gray-500" />
                    Organization Profile
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                        <input
                            type="text"
                            disabled
                            value={user?.organization?.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Business Sector</label>
                        <p className="text-xs text-gray-500 mb-2">Changing this will adapt your dashboard widgets.</p>
                        <select
                            value={activeType}
                            onChange={(e) => setActiveType(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="General">General (Default)</option>
                            <option value="Hospitality">Hospitality (Restaurants, Hotels)</option>
                            <option value="Retail">Retail (Grocery, Supermarkets)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div>
                        {message && <span className="text-sm text-green-600 font-medium">{message}</span>}
                    </div>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
