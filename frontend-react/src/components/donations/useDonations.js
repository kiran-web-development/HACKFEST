import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foodwaste_donations';

const initialDonations = [
  {
    id: '1',
    itemName: 'Canned Beans',
    category: 'Canned',
    quantity: 5,
    unit: 'cans',
    expiryDate: '2024-03-01',
    donorName: 'John Doe',
    distance: 1.2,
    status: 'available',
    pickupNotes: 'Front porch pickup',
    postedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    itemName: 'Fresh Oranges',
    category: 'Produce',
    quantity: 2,
    unit: 'kg',
    expiryDate: '2023-11-25',
    donorName: 'Jane Smith',
    distance: 0.5,
    status: 'available',
    pickupNotes: 'Call upon arrival',
    postedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    itemName: 'Rice Bag',
    category: 'Grains',
    quantity: 10,
    unit: 'kg',
    expiryDate: '2024-06-01',
    donorName: 'Community Center',
    distance: 3.5,
    status: 'claimed',
    pickupNotes: 'Ask for Sarah',
    postedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export function useDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDonations(JSON.parse(stored));
    } else {
      setDonations(initialDonations);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDonations));
    }
    setLoading(false);
  }, []);

  const saveDonations = (newDonations) => {
    setDonations(newDonations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDonations));
  };

  const postDonation = (donationData) => {
    const newDonation = {
      id: Date.now().toString(),
      ...donationData,
      donorName: 'Me', // Simulate current user
      distance: 0,
      status: 'available',
      postedAt: new Date().toISOString()
    };
    saveDonations([newDonation, ...donations]);
    return newDonation;
  };

  const claimDonation = (id) => {
    const newDonations = donations.map(item => 
      item.id === id ? { ...item, status: 'claimed', claimedBy: 'Me' } : item
    );
    saveDonations(newDonations);
  };

  return {
    donations,
    loading,
    postDonation,
    claimDonation
  };
}
