import React, { useState } from 'react';
import { useFilters } from './Context';

const Navbar = () => {
    const { setSearchTerm } = useFilters();
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(localSearchTerm);
        console.log('Searching for:', localSearchTerm);
    };

    const handleLogoClick = () => {
        setSearchTerm('');
        setLocalSearchTerm('');
    };

    return (
        <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            {/* Logo */}
            <div className="flex items-center">
                <a
                    href="/"
                    className="text-xl font-bold text-gray-800 hover:text-gray-900"
                    onClick={handleLogoClick}
                >
                    MyLogo
                </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={localSearchTerm}
                        onChange={handleSearchChange}
                        className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
                <a
                    href="/login"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                    Login
                </a>
                <a
                    href="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                    Sign Up
                </a>
            </div>
        </nav>
    );
};

export default Navbar;