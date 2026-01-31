import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foodwaste_waste_logs';

const initialLogs = [
  { 
    id: '1', 
    itemName: 'Lettuce', 
    category: 'Produce', 
    quantity: 0.5, 
    unit: 'kg', 
    reason: 'Spoiled', 
    cost: 2.50, 
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    carbon: 1.25 
  },
  { 
    id: '2', 
    itemName: 'Bread', 
    category: 'Grains', 
    quantity: 0.3, 
    unit: 'kg', 
    reason: 'Expired', 
    cost: 1.20, 
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    carbon: 0.75 
  }
];

export function useWaste() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      setLogs(initialLogs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLogs));
    }
    setLoading(false);
  }, []);

  const saveLogs = (newLogs) => {
    setLogs(newLogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
  };

  const addLog = (logData) => {
    // Simple carbon calculation: 2.5kg CO2 per kg of food waste (average estimate)
    // Adjust logic based on category later if needed
    let weightInKg = parseFloat(logData.quantity);
    if (logData.unit === 'g' || logData.unit === 'ml') weightInKg = weightInKg / 1000;
    if (logData.unit === 'pcs') weightInKg = weightInKg * 0.15; // Avg 150g per piece
    
    const carbon = (weightInKg * 2.5).toFixed(2);

    const newLog = {
      id: Date.now().toString(),
      ...logData,
      carbon: parseFloat(carbon),
      date: logData.date || new Date().toISOString()
    };
    
    saveLogs([newLog, ...logs]);
    return newLog;
  };

  const getStats = () => {
    const totalWaste = logs.reduce((acc, log) => {
      let weight = parseFloat(log.quantity);
      if (log.unit === 'g' || log.unit === 'ml') weight /= 1000;
      if (log.unit === 'pcs') weight *= 0.15; // Estimation
      return acc + weight;
    }, 0);

    const totalCost = logs.reduce((acc, log) => acc + (parseFloat(log.cost) || 0), 0);
    const totalCarbon = logs.reduce((acc, log) => acc + (parseFloat(log.carbon) || 0), 0);

    return {
      totalWaste: totalWaste.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalCarbon: totalCarbon.toFixed(2)
    };
  };

  return {
    logs,
    loading,
    addLog,
    getStats
  };
}
