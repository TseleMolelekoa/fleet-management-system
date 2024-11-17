import { useState } from 'react';

import PropTypes from 'prop-types';

const MaintenanceForm = ({ onSubmit }) => {
    const [vehicleId, setVehicleId] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const maintenanceData = {
            vehicleId,
            maintenanceDate,
            description,
            cost,
        };
        // Use the onSubmit callback to pass data to the parent component
        onSubmit(maintenanceData);

        // Reset form fields
        setVehicleId('');
        setMaintenanceDate('');
        setDescription('');
        setCost('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Maintenance Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Vehicle ID Input */}
                <div>
                    <label className="block font-medium mb-1">Vehicle ID</label>
                    <input
                        type="text"
                        placeholder="Enter Vehicle ID"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Maintenance Date Input */}
                <div>
                    <label className="block font-medium mb-1">Maintenance Date</label>
                    <input
                        type="date"
                        value={maintenanceDate}
                        onChange={(e) => setMaintenanceDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        placeholder="Brief description of the maintenance"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Cost Input */}
                <div>
                    <label className="block font-medium mb-1">Cost</label>
                    <input
                        type="number"
                        placeholder="Enter cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        className="w-full p-2 border rounded"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Submit Maintenance Record
                </button>
            </form>
        </div>
    );
};

MaintenanceForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default MaintenanceForm;
