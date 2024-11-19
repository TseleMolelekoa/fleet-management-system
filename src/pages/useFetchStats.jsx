import { useState, useEffect } from 'react';

const useFetchStats = () => {
    const [driverStats, setDriverStats] = useState([]);
    const [vehicleStats, setVehicleStats] = useState([]);
    const [companyStats, setCompanyStats] = useState([]);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stats');  // API URL (adjust if needed)
                if (!response.ok) throw new Error('Failed to fetch stats');

                // Parse JSON response
                const data = await response.json();

                // Set the fetched data into state
                setDriverStats(data.driverStats || []);
                setVehicleStats(data.vehicleStats || []);
                setCompanyStats(data.companyStats || []);
                setMaintenanceRecords(data.maintenanceRecords || []);
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []); // Empty dependency array means this runs once when the component mounts

    return { driverStats, vehicleStats, companyStats, maintenanceRecords, loading, error };
};

export default useFetchStats;
