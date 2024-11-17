import React, { useState } from 'react';

const AddStatsForm = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [icon, setIcon] = useState('');
    const [bgColor, setBgColor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic (POST request to backend)
        console.log({ title, value, icon, bgColor });
        setTitle('');
        setValue('');
        setIcon('');
        setBgColor('');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Dashboard Stat</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Background Color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Stat</button>
            </form>
        </div>
    );
};

export default AddStatsForm;
