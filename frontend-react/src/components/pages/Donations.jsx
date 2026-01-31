import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { useDonations } from '../donations/useDonations';
import DonationCard from '../donations/DonationCard';
import DonationFilters from '../donations/DonationFilters';
import PostDonationModal from '../donations/PostDonationModal';

export default function Donations() {
    const { donations, postDonation, claimDonation, loading } = useDonations();
    const [activeTab, setActiveTab] = useState('browse');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState({
        search: '',
        category: 'All',
        maxDistance: 50
    });

    if (loading) return <div>Loading marketplace...</div>;

    const handleClaim = (id) => {
        if (window.confirm("Are you sure you want to claim this donation? You'll receive the donor's contact info.")) {
            claimDonation(id);
        }
    };

    const filteredDonations = donations.filter(item => {
        // Tab filtering
        if (activeTab === 'browse' && (item.status === 'claimed' && item.claimedBy !== 'Me')) return false;
        if (activeTab === 'activity' && item.donorName !== 'Me' && item.claimedBy !== 'Me') return false;

        // Search filtering
        if (!item.itemName.toLowerCase().includes(filter.search.toLowerCase())) return false;

        // Category filtering
        if (filter.category !== 'All' && item.category !== filter.category) return false;

        // Distance filtering
        if (item.distance > filter.maxDistance) return false;

        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Donation Marketplace</h1>
                    <p className="text-gray-500">Share food with your community.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Donate Food
                </button>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('browse')}
                        className={`${activeTab === 'browse'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Browse Donations
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`${activeTab === 'activity'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        My Activity
                    </button>
                </nav>
            </div>

            <DonationFilters filter={filter} setFilter={setFilter} />

            {filteredDonations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {activeTab === 'browse'
                            ? "Check back later or adjust your filters."
                            : "You haven't posted or claimed any donations yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDonations.map((donation) => (
                        <DonationCard
                            key={donation.id}
                            donation={donation}
                            onClaim={handleClaim}
                            isMyPost={donation.donorName === 'Me'}
                        />
                    ))}
                </div>
            )}

            <PostDonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={postDonation}
            />
        </div>
    );
}
