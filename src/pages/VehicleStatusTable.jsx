import React from 'react';

const VehicleStatusTable = ({ vehicleStats }) => {
    return (
        <div className="mb-8 w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Vehicle Status</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Vehicle ID</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Maintenance Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Fuel Used (liters)</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {vehicleStats.map((vehicle, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm text-gray-800">{vehicle.vehicleId}</td>
                            <td className="px-6 py-4 text-sm">
                                {vehicle.needsMaintenance ? (
                                    <span className="text-red-500 font-semibold">Needs Maintenance</span>
                                ) : (
                                    <span className="text-green-500 font-semibold">Good Condition</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800">{vehicle.fuelUsed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleStatusTable;
