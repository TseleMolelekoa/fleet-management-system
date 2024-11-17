// Navbar.js
import React from 'react';

const Navbar = ({ setActiveForm }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">Fleet Management</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveForm('addDriver')}
                        className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Add Driver
                    </button>
                    <button
                        onClick={() => setActiveForm('addFleetUsage')}
                        className="bg-green-600 text-white py-2 px-4 rounded"
                    >
                        Add Fleet Usage
                    </button>
                    <button
                        onClick={() => setActiveForm('addMaintenance')}
                        className="bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Add Maintenance
                    </button>
                    <button
                        onClick={() => setActiveForm('addStats')}
                        className="bg-yellow-600 text-white py-2 px-4 rounded"
                    >
                        Add Stat
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
