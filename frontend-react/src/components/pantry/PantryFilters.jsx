import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

export default function PantryFilters({ search, setSearch, category, setCategory, sort, setSort }) {
    const categories = ['All', 'Produce', 'Dairy', 'Meat', 'Grains', 'Canned', 'Beverages', 'Other'];

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Search pantry items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex space-x-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SortAsc className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="expiry_asc">Expiry (Earliest first)</option>
                        <option value="expiry_desc">Expiry (Latest first)</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
