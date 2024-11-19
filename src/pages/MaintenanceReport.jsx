// MaintenanceReport.js
import { useState, useEffect } from 'react';

const MaintenanceReport = () => {
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMaintenanceRecords = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/maintenance');
                const data = await response.json();

                if (response.ok) {
                    setMaintenanceRecords(data);
                } else {
                    setMessage(data.error || 'Failed to fetch records');
                }
            } catch (error) {
                setMessage('Error: ' + error.message);
            }
        };

        fetchMaintenanceRecords();
    }, []);

    return (
        <div>
            <h2>Maintenance Records</h2>
            {message && <p>{message}</p>}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Vehicle ID</th>
                    <th>Description</th>
                    <th>Maintenance Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {maintenanceRecords.length === 0 ? (
                    <tr>
                        <td colSpan="5">No maintenance records available</td>
                    </tr>
                ) : (
                    maintenanceRecords.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.vehicleId}</td>
                            <td>{record.description}</td>
                            <td>{record.maintenanceDate}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceReport;
