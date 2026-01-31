import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, ShoppingBasket, Trash2, PieChart, Heart, Users, LogOut, Truck, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AppLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Pantry', path: '/pantry', icon: ShoppingBasket },
        { name: 'Waste Log', path: '/waste', icon: Trash2 },
        { name: 'Reports', path: '/reports', icon: PieChart },
        { name: 'Donations', path: '/donations', icon: Heart },
        { name: 'Suppliers', path: '/suppliers', icon: Truck },
        { name: 'Team', path: '/team', icon: Users },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-20 px-4 py-3 flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">EcoPantry</span>
                <button onClick={toggleMenu} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 z-40 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 hidden md:block">
                    <h1 className="text-2xl font-bold text-green-600">EcoPantry</h1>
                </div>

                <div className="p-6 md:hidden flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-green-600">EcoPantry</h1>
                    <button onClick={toggleMenu}><X className="text-gray-500" /></button>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-green-50 text-green-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-green-700" : "text-gray-400")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <Link
                        to="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <SettingsIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                    </Link>
                    <div className="flex items-center mb-4 px-4">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-gray-700 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.organization?.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto w-full pt-14 md:pt-0">
                <main className="p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
