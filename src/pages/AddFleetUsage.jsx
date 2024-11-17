import React, { useState } from 'react';

const AddFleetUsageForm = () => {
    const [usageDate, setUsageDate] = useState('');
    const [usage, setUsage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic (POST request to backend)
        console.log({ usageDate, usage });
        setUsageDate('');
        setUsage('');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Fleet Usage</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={usageDate}
                    onChange={(e) => setUsageDate(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="number"
                    placeholder="Usage"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Fleet Usage</button>
            </form>
        </div>
    );
};

export default AddFleetUsageForm;
