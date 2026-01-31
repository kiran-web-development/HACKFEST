import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock session
        const storedUser = localStorage.getItem('foodwaste_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, _password) => {
        // Mock login
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    email,
                    name: email.split('@')[0],
                    role: 'owner',
                    organization: { id: 'org_1', name: 'My Household' }
                };
                localStorage.setItem('foodwaste_user', JSON.stringify(mockUser));
                setUser(mockUser);
                resolve(mockUser);
            }, 500); // Simulate network delay
        });
    };

    const signup = async (email, password, type) => {
        // Mock signup
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    email,
                    name: email.split('@')[0],
                    role: 'owner',
                    organization: { id: 'org_1', name: type === 'business' ? 'My Business' : 'My Household' },
                    organizationType: localStorage.getItem('foodwaste_org_type') || 'General'
                };
                localStorage.setItem('foodwaste_user', JSON.stringify(mockUser));
                setUser(mockUser);
                resolve(mockUser);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('foodwaste_user');
        localStorage.removeItem('foodwaste_org_type');
    };

    const updateOrgType = (type) => {
        if (user) {
            const updatedUser = { ...user, organizationType: type };
            setUser(updatedUser);
            localStorage.setItem('foodwaste_org_type', type);
        }
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateOrgType,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
