import React from 'react';

const MaintenanceOverview = ({ completed, inProgress, upcoming }) => {
    return (
        <div className="mb-8 w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Maintenance Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {/* Completed Maintenance */}
                <div className="p-6 bg-green-600 rounded-lg shadow-lg border border-green-300 hover:bg-green-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-green-950">Completed Maintenance</h4>
                    {completed.length > 0 ? (
                        completed.map((record, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-medium text-gray-800">Vehicle ID: {record.vehicleId}</p>
                                <p className="text-sm text-gray-600">Date: {record.maintenanceDate}</p>
                                <p className="text-sm text-gray-800">Description: {record.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No vehicles have completed maintenance.</p>
                    )}
                </div>

                {/* In-Progress Maintenance */}
                <div className="p-6 bg-yellow-600 rounded-lg shadow-lg border border-yellow-300 hover:bg-yellow-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-yellow-950">Currently in Maintenance</h4>
                    {inProgress.length > 0 ? (
                        inProgress.map((record, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-medium text-gray-800">Vehicle ID: {record.vehicleId}</p>
                                <p className="text-sm text-gray-600">Date: {record.maintenanceDate}</p>
                                <p className="text-sm text-gray-800">Description: {record.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No vehicles are currently in maintenance.</p>
                    )}
                </div>

                {/* Upcoming Maintenance */}
                <div className="p-6 bg-blue-600 rounded-lg shadow-lg border border-blue-300 hover:bg-blue-400 hover:shadow-xl transition duration-900 ease-in-out">
                    <h4 className="text-lg font-semibold text-blue-800">Upcoming Maintenance</h4>
                    {upcoming.length > 0 ? (
                        upcoming.map((record, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-medium text-gray-800">Vehicle ID: {record.vehicleId}</p>
                                <p className="text-sm text-gray-600">Scheduled Date: {record.maintenanceDate}</p>
                                <p className="text-sm text-gray-800">Description: {record.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No vehicles are scheduled for upcoming maintenance.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MaintenanceOverview;
