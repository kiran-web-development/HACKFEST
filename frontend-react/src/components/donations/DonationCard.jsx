import React from 'react';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

export default function DonationCard({ donation, onClaim, isMyPost }) {
    const isAvailable = donation.status === 'available';

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                            {donation.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{donation.itemName}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {donation.quantity} {donation.unit} • Expires {new Date(donation.expiryDate).toLocaleDateString()}
                        </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${isAvailable ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {donation.status}
                    </span>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {donation.distance} km away
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(donation.postedAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-700">Donor: {donation.donorName}</p>
                    <p className="text-gray-500 text-xs mt-1">{donation.pickupNotes}</p>
                </div>

                {donation.status === 'claimed' && (
                    <div className="mt-3 flex items-center text-sm text-green-600 bg-green-50 p-2 rounded">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Claimed! Contact donor: 555-0123
                    </div>
                )}
            </div>

            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                {isAvailable && !isMyPost ? (
                    <button
                        onClick={() => onClaim(donation.id)}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Claim Donation
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
                    >
                        {isMyPost ? 'Your Posting' : 'Not Available'}
                    </button>
                )}
            </div>
        </div>
    );
}
