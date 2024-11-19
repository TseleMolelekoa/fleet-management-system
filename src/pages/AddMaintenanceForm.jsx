import React, { useState } from 'react';

const AddMaintenanceForm = () => {
    const [formData, setFormData] = useState({
        vehicleId: '',
        description: '',
        maintenanceDate: '',
        status: 'upcoming', // Default status
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/maintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Maintenance record saved successfully');
                setFormData({ vehicleId: '', description: '', maintenanceDate: '', status: 'upcoming' });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to save maintenance record');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error occurred while saving maintenance record');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700">Vehicle ID:</label>
                <input
                    type="text"
                    name="vehicleId"
                    value={formData.vehicleId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Maintenance Date:</label>
                <input
                    type="date"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {errorMessage && (
                <div className="mb-4 text-red-500">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white py-2 rounded hover:bg-blue-600`}
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Add Maintenance Record'}
            </button>
        </form>
    );
};

export default AddMaintenanceForm;
