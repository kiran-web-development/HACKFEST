import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('household');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signup(email, password, type);
            navigate('/');
        } catch (error) {
            console.error('Failed to sign up', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create account</h2>
                    <p className="mt-2 text-sm text-gray-600">Start organizing your food usage</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Account Type</label>
                        <div className="mt-1 flex space-x-4">
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium ${type === 'household'
                                        ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setType('household')}
                            >
                                Household
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 border rounded-md text-sm font-medium ${type === 'business'
                                        ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setType('business')}
                            >
                                Business
                            </button>
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link to="/login" className="text-sm text-green-600 hover:text-green-500">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
