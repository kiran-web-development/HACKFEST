import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foodwaste_pantry_items';

const initialItems = [
  { id: '1', name: 'Milk', category: 'Dairy', quantity: 1, unit: 'L', expiryDate: '2023-11-15' },
  { id: '2', name: 'Eggs', category: 'Dairy', quantity: 12, unit: 'pcs', expiryDate: '2023-11-20' },
  { id: '3', name: 'Apples', category: 'Produce', quantity: 5, unit: 'pcs', expiryDate: '2023-11-10' },
];

export function usePantry() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      // Load initial demo data if empty
      setItems(initialItems);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
    }
    setLoading(false);
  }, []);

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const newItem = {
      id: Date.now().toString(),
      ...item,
      addedAt: new Date().toISOString()
    };
    saveItems([newItem, ...items]);
  };

  const updateItem = (id, updates) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveItems(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
  };

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem
  };
}
