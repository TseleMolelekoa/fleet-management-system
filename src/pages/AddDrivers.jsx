import { useState } from 'react';

const AddDriverForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic (POST request to backend)
        console.log({ firstName, lastName, licenseNumber });
        // Reset form after submission
        setFirstName('');
        setLastName('');
        setLicenseNumber('');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Driver</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Driver</button>
            </form>
        </div>
    );
};

export default AddDriverForm;
