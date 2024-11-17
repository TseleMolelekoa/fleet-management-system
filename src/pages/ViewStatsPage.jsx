// ViewStatsPage.js
import { useEffect, useState } from 'react';

const ViewStatsPage = () => {
    const [fleetPerformance, setFleetPerformance] = useState([]);

    // Fetch performance data for each fleet
    useEffect(() => {
        fetch('/api/fleet-performance')
            .then((res) => res.json())
            .then((data) => setFleetPerformance(data))
            .catch((err) => console.error('Error fetching fleet performance:', err));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Fleet Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fleetPerformance.map((fleet, index) => (
                    <div key={index} className="p-4 rounded-lg shadow-md bg-gray-200">
                        <h3 className="text-xl font-bold">{fleet.name}</h3>
                        <p className="text-lg mt-2">Total Mileage: {fleet.totalMileage} km</p>
                        <p className="text-lg mt-2">Fuel Efficiency: {fleet.fuelEfficiency} km/l</p>
                        <p className="text-lg mt-2">Maintenance Count: {fleet.maintenanceCount}</p>
                        <p className="text-lg mt-2">Availability: {fleet.availability}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewStatsPage;
