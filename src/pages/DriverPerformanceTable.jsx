const DriverPerformanceTable = ({ driverStats }) => (
    <div className="mb-8 w-full">
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
);

export default DriverPerformanceTable;
