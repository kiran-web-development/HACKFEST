import React from 'react';
import { Mail, Shield, Smartphone, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

export default function TeamMemberCard({ member, onEdit, onDelete }) {
    const roleColors = {
        Admin: 'bg-purple-100 text-purple-800',
        Manager: 'bg-blue-100 text-blue-800',
        Staff: 'bg-gray-100 text-gray-800'
    };

    const statusColors = {
        Active: 'bg-green-100 text-green-800',
        Invited: 'bg-yellow-100 text-yellow-800',
        Inactive: 'bg-red-100 text-red-800'
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                        {member.avatar}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${roleColors[member.role] || 'bg-gray-100 text-gray-800'}`}>
                                {member.role}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[member.status] || 'bg-gray-100 text-gray-800'}`}>
                                {member.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>

                    {/* Dropdown Menu (Simple implementation for demo) */}
                    <div className="absolute right-0 w-32 bg-white rounded-md shadow-lg py-1 border border-gray-100 hidden group-hover:block z-10">
                        <button
                            onClick={() => onEdit(member)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <Edit2 className="h-3 w-3 mr-2" /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(member.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                            <Trash2 className="h-3 w-3 mr-2" /> Remove
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-3 text-gray-400" />
                    Access Level: {member.role}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
                Joined {new Date(member.joinedDate).toLocaleDateString()}
            </div>
        </div>
    );
}
