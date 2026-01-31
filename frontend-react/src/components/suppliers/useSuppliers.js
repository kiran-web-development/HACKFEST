import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foodwaste_suppliers';

const initialSuppliers = [
  {
    id: '1',
    name: 'Green Valley Farms',
    category: 'Produce',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah@greenvalley.com',
    phone: '555-0101',
    rating: 4.8,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Daily Dairy Co.',
    category: 'Dairy',
    contactPerson: 'Mike Ross',
    email: 'orders@dailydairy.com',
    phone: '555-0102',
    rating: 4.2,
    joinedDate: '2023-03-10'
  },
  {
    id: '3',
    name: 'Prime Meats Ltd',
    category: 'Meat',
    contactPerson: 'David Chen',
    email: 'david@primemeats.com',
    phone: '555-0103',
    rating: 4.5,
    joinedDate: '2023-02-20'
  }
];

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSuppliers(JSON.parse(stored));
    } else {
      setSuppliers(initialSuppliers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSuppliers));
    }
    setLoading(false);
  }, []);

  const saveSuppliers = (newSuppliers) => {
    setSuppliers(newSuppliers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSuppliers));
  };

  const addSupplier = (supplierData) => {
    const newSupplier = {
      id: Date.now().toString(),
      ...supplierData,
      rating: 5.0, // Default rating for new suppliers
      joinedDate: new Date().toISOString()
    };
    saveSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id, updatedData) => {
    const newSuppliers = suppliers.map(s => 
      s.id === id ? { ...s, ...updatedData } : s
    );
    saveSuppliers(newSuppliers);
  };

  const deleteSupplier = (id) => {
    const newSuppliers = suppliers.filter(s => s.id !== id);
    saveSuppliers(newSuppliers);
  };

  return {
    suppliers,
    loading,
    addSupplier,
    updateSupplier,
    deleteSupplier
  };
}
