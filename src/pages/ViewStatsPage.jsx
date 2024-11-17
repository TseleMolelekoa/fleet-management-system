import { useState, useEffect } from 'react';

const ViewStatsPage = () => {
    const [driverStats, setDriverStats] = useState([]);
    const [vehicleStats, setVehicleStats] = useState([]);
    const [companyStats, setCompanyStats] = useState({
        newDrivers: 0,
        leftDrivers: 0,
        newDriversCost: 0,
        newVehiclesCost: 0,
        fleetTransported: {
            weekly: 0,
            monthly: 0,
            yearly: 0,
        }
    });

    useEffect(() => {
        // Fetch driver and vehicle stats from your backend
        fetch('/api/driver-stats')
            .then((res) => res.json())
            .then((data) => setDriverStats(data))
            .catch((err) => console.error('Error fetching driver stats:', err));

        fetch('/api/vehicle-stats')
            .then((res) => res.json())
            .then((data) => setVehicleStats(data))
            .catch((err) => console.error('Error fetching vehicle stats:', err));

        // Fetch company-level stats
        fetch('/api/company-stats')
            .then((res) => res.json())
            .then((data) => setCompanyStats(data))
            .catch((err) => console.error('Error fetching company stats:', err));
    }, []);

    return (
        <div className="bg-gray-500 min-h-screen p-7">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Company Performance Stats</h2>
                {/* Drivers Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">Driver Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Driver Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Performance Rating</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Fuel Used (liters)</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {driverStats.map((driver, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-sm text-gray-800">{driver.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{driver.performance}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{driver.fuelUsed}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Vehicles Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">Vehicle Status</h3>
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

                {/* Company Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-lg shadow-md bg-blue-500 text-white">
                        <h4 className="text-lg font-semibold">New Drivers</h4>
                        <p>Total New Drivers: {companyStats.newDrivers}</p>
                        <p>Drivers Left: {companyStats.leftDrivers}</p>
                        <p>Cost for New Drivers: R{companyStats.newDriversCost}</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-md bg-green-500 text-white">
                        <h4 className="text-lg font-semibold">Fleet Transportation</h4>
                        <p>Weekly Transported: {companyStats.fleetTransported.weekly} tons</p>
                        <p>Monthly Transported: {companyStats.fleetTransported.monthly} tons</p>
                        <p>Yearly Transported: {companyStats.fleetTransported.yearly} tons</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-md bg-yellow-500 text-white">
                        <h4 className="text-lg font-semibold">New Vehicles</h4>
                        <p>Total Cost for New Vehicles: R{companyStats.newVehiclesCost}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStatsPage;
