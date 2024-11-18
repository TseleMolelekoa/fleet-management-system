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
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);

    useEffect(() => {
        // Fetch data here
        fetch('/api/driver-stats')
            .then((res) => res.json())
            .then((data) => setDriverStats(data))
            .catch((err) => console.error('Error fetching driver stats:', err));

        fetch('/api/vehicle-stats')
            .then((res) => res.json())
            .then((data) => setVehicleStats(data))
            .catch((err) => console.error('Error fetching vehicle stats:', err));

        fetch('/api/company-stats')
            .then((res) => res.json())
            .then((data) => setCompanyStats(data))
            .catch((err) => console.error('Error fetching company stats:', err));

        fetch('/api/maintenance-records')
            .then((res) => res.json())
            .then((data) => setMaintenanceRecords(data))
            .catch((err) => console.error('Error fetching maintenance records:', err));
    }, []);

    // Categorizing maintenance records
    const categorizeMaintenance = () => {
        const today = new Date();
        const completed = [];
        const inProgress = [];
        const upcoming = [];

        maintenanceRecords.forEach((record) => {
            const maintenanceDate = new Date(record.maintenanceDate);
            if (record.status === 'completed') {
                completed.push(record);
            } else if (record.status === 'in-progress') {
                inProgress.push(record);
            } else if (record.status === 'upcoming' && maintenanceDate >= today) {
                upcoming.push(record);
            }
        });

        return { completed, inProgress, upcoming };
    };

    const { completed, inProgress, upcoming } = categorizeMaintenance();

    return (
        <div className="bg-gray-650 min-h-screen flex items-center justify-center p-7">
            <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">Company Performance Stats</h2>

                {/* Driver Performance Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Driver Performance</h3>
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

                {/* Vehicle Status Section */}
                <div className="mb-8">
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

                {/* Maintenance Records Section */}
                <div className="mb-8">
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

                {/* Company Stats Section */}
                <h3 className="text-2xl font-bold text-white mb-4">Company Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* New Drivers */}
                    <div className="p-6 bg-blue-600 rounded-lg shadow-lg border border-blue-300 hover:bg-blue-600 hover:shadow-xl transition duration-900 ease-in-out">
                        <h4 className="text-lg font-semibold text-white">New Drivers</h4>
                        <p className="text-sm text-white">Total New Drivers: {companyStats.newDrivers}</p>
                        <p className="text-sm text-white">Drivers Left: {companyStats.leftDrivers}</p>
                        <p className="text-sm text-white">Cost for New Drivers: R{companyStats.newDriversCost}</p>
                    </div>

                    {/* Fleet Transportation */}
                    <div className="p-6 bg-green-600 rounded-lg shadow-lg border border-green-300 hover:bg-green-600 hover:shadow-xl transition duration-900 ease-in-out">
                        <h4 className="text-lg font-semibold text-white">Fleet Transportation</h4>
                        <p className="text-sm text-white">Weekly Transported: {companyStats.fleetTransported.weekly} tons</p>
                        <p className="text-sm text-white">Monthly Transported: {companyStats.fleetTransported.monthly} tons</p>
                        <p className="text-sm text-white">Yearly Transported: {companyStats.fleetTransported.yearly} tons</p>
                    </div>

                    {/* New Vehicles */}
                    <div className="p-6 bg-yellow-600 rounded-lg shadow-lg border border-yellow-300 hover:bg-yellow-600 hover:shadow-xl transition duration-900 ease-in-out">
                        <h4 className="text-lg font-semibold text-white">New Vehicles</h4>
                        <p className="text-sm text-white">Total Cost for New Vehicles: R{companyStats.newVehiclesCost}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStatsPage;
