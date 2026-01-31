import { useState, useEffect } from 'react';

const STORAGE_KEY = 'foodwaste_team';

const initialTeam = [
  {
    id: '1',
    name: 'Kiran Kumar',
    email: 'kiran@example.com',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2023-01-01',
    avatar: 'K'
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Manager',
    status: 'Active',
    joinedDate: '2023-02-15',
    avatar: 'A'
  },
  {
    id: '3',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Staff',
    status: 'Invited',
    joinedDate: '2023-11-20',
    avatar: 'B'
  }
];

export function useTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMembers(JSON.parse(stored));
    } else {
      setMembers(initialTeam);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTeam));
    }
    setLoading(false);
  }, []);

  const saveMembers = (newMembers) => {
    setMembers(newMembers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMembers));
  };

  const addMember = (memberData) => {
    const newMember = {
      id: Date.now().toString(),
      ...memberData,
      status: 'Invited',
      joinedDate: new Date().toISOString(),
      avatar: memberData.name.charAt(0).toUpperCase()
    };
    saveMembers([...members, newMember]);
  };

  const updateMember = (id, updatedData) => {
    const newMembers = members.map(m => 
      m.id === id ? { ...m, ...updatedData } : m
    );
    saveMembers(newMembers);
  };

  const removeMember = (id) => {
    const newMembers = members.filter(m => m.id !== id);
    saveMembers(newMembers);
  };

  return {
    members,
    loading,
    addMember,
    updateMember,
    removeMember
  };
}
