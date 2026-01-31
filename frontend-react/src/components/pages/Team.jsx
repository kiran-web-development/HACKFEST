import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useTeam } from '../team/useTeam';
import TeamList from '../team/TeamList';
import AddMemberModal from '../team/AddMemberModal';

export default function Team() {
    const { members, addMember, updateMember, removeMember, loading } = useTeam();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <div>Loading team...</div>;

    const handleSave = (memberData) => {
        if (editingMember) {
            updateMember(editingMember.id, memberData);
        } else {
            addMember(memberData);
        }
        setEditingMember(null);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
            removeMember(id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMember(null);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                    <p className="text-gray-500">Manage access and roles for your organization.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Member
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search team members..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <TeamList
                members={filteredMembers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AddMemberModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                initialData={editingMember}
            />
        </div>
    );
}
