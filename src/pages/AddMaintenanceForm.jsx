import { useState } from 'react';

// Parent component managing the maintenance count
const FleetManagement = () => {
    const [maintenanceCount, setMaintenanceCount] = useState(0);

    const handleAddMaintenance = () => {
        setMaintenanceCount(maintenanceCount + 1); // Increment the count
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Fleet Management Dashboard</h2>
            <p className="mb-4">Vehicles scheduled for maintenance: {maintenanceCount}</p>
            <AddMaintenanceForm onAddMaintenance={handleAddMaintenance} />
        </div>
    );
};

// AddMaintenanceForm component
import PropTypes from 'prop-types';

const AddMaintenanceForm = ({ onAddMaintenance }) => {
    const [vehicleId, setVehicleId] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic (POST request to backend)
        console.log({ vehicleId, maintenanceDate });
        setVehicleId('');
        setMaintenanceDate('');
        onAddMaintenance(); // Notify parent to update the count
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Maintenance Record</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vehicle ID"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="date"
                    value={maintenanceDate}
                    onChange={(e) => setMaintenanceDate(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Maintenance</button>
            </form>
        </div>
    );
};

AddMaintenanceForm.propTypes = {
    onAddMaintenance: PropTypes.func.isRequired,
};

export default FleetManagement;
