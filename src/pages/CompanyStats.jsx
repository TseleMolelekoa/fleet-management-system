import React from 'react';

const CompanyStats = ({ stats }) => {
    return (
        <div className="mb-8 w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Company Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-teal-600 p-6 rounded-lg shadow-lg hover:bg-teal-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">New Drivers</h4>
                    <p className="text-2xl font-bold text-white">{stats.newDrivers}</p>
                </div>
                <div className="bg-red-600 p-6 rounded-lg shadow-lg hover:bg-red-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">Drivers Who Left</h4>
                    <p className="text-2xl font-bold text-white">{stats.leftDrivers}</p>
                </div>
                <div className="bg-purple-600 p-6 rounded-lg shadow-lg hover:bg-purple-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">New Drivers Cost</h4>
                    <p className="text-2xl font-bold text-white">${stats.newDriversCost}</p>
                </div>
                <div className="bg-orange-600 p-6 rounded-lg shadow-lg hover:bg-orange-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">New Vehicles Cost</h4>
                    <p className="text-2xl font-bold text-white">${stats.newVehiclesCost}</p>
                </div>
                <div className="bg-green-600 p-6 rounded-lg shadow-lg hover:bg-green-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">Weekly Fleet Transport</h4>
                    <p className="text-2xl font-bold text-white">{stats.fleetTransported.weekly}</p>
                </div>
                <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">Monthly Fleet Transport</h4>
                    <p className="text-2xl font-bold text-white">{stats.fleetTransported.monthly}</p>
                </div>
                <div className="bg-yellow-600 p-6 rounded-lg shadow-lg hover:bg-yellow-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-white">Yearly Fleet Transport</h4>
                    <p className="text-2xl font-bold text-white">{stats.fleetTransported.yearly}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyStats;
