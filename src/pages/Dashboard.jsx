import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddDriverForm from './AddDrivers';
import AddFleetUsageForm from './AddFleetUsage';
import AddMaintenanceForm from './AddMaintenanceForm';
import AddStatsForm from './AddStatsPage';

const Dashboard = () => {
    // State for dashboard statistics
    const [dashboardStats, setDashboardStats] = useState([
        { icon: '🚚', title: 'Total Vehicles', value: 0 }, // Total number of vehicles in the fleet
        { icon: '🟢', title: 'Available Vehicles', value: 0 }, // Vehicles currently available for use
        { icon: '👷‍♂️', title: 'Drivers Registered', value: 0 }, // Total registered drivers
        { icon: '🛠️', title: 'Upcoming Maintenance', value: 0 }, // Number of vehicles scheduled for maintenance
    ]);

    const [recentActivities, setRecentActivities] = useState([]);
    const [activeForm, setActiveForm] = useState(''); // State to track active form

    // Function to render the correct form based on active form
    const renderActiveForm = () => {
        switch (activeForm) {
            case 'addDriver':
                return <AddDriverForm onAddDriver={handleAddDriver} />;
            case 'addFleetUsage':
                return <AddFleetUsageForm onAddFleet={handleAddFleet} onFleetUsageChange={handleFleetUsageChange} />;
            case 'addMaintenance':
                return <AddMaintenanceForm onAddMaintenance={handleAddMaintenance} />;
            case 'addStats':
                return <AddStatsForm />;
            default:
                return null;
        }
    };

    // Handler functions for updating each dashboard stat

    // Handler for adding a new vehicle to the fleet
    const handleAddFleet = (newFleetData) => {
        console.log("New fleet added:", newFleetData);
        updateDashboardStat(0, 1); // Increment total vehicles
        updateDashboardStat(1, 1); // Increment available vehicles
    };

    // Handler for changing fleet usage (e.g., vehicle assigned)
    const handleFleetUsageChange = (isAvailable) => {
        console.log("Fleet usage updated, isAvailable:", isAvailable);
        if (isAvailable) {
            updateDashboardStat(1, 1); // Increment available vehicles
        } else {
            updateDashboardStat(1, -1); // Decrement available vehicles
        }
    };

    // Handler for adding a driver
    const handleAddDriver = (newDriverData) => {
        console.log("Driver registered:", newDriverData);
        updateDashboardStat(2, 1); // Increment registered drivers
    };

    // Handler for adding a maintenance record
    const handleAddMaintenance = (maintenanceData) => {
        console.log("Adding maintenance:", maintenanceData);
        updateDashboardStat(3, 1); // Increment upcoming maintenance count
        updateDashboardStat(1, -1); // Decrement available vehicles (if needed)
    };

    // Helper function to update a specific dashboard stat
    const updateDashboardStat = (index, change) => {
        setDashboardStats(prevStats => {
            const updatedStats = [...prevStats];
            updatedStats[index].value += change;
            return updatedStats;
        });
    };

    // Fetch dashboard stats and recent activities from your backend
    useEffect(() => {
        fetch('/api/dashboard-stats')
            .then((res) => res.json())
            .then((data) => setDashboardStats(data))
            .catch((err) => console.error('Error fetching dashboard stats:', err));

        fetch('/api/recent-activities')
            .then((res) => res.json())
            .then((data) => setRecentActivities(data))
            .catch((err) => console.error('Error fetching recent activities:', err));
    }, []);

    return (
        <div>
            <Navbar setActiveForm={setActiveForm} /> {/* Pass setActiveForm to Navbar */}
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6">Welcome to the Fleet Management System</h1>

                {/* Render the active form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {renderActiveForm()}
                </div>

                {/* Dashboard Stats Section */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {/* Vehicle Stats */}
                    <div className="p-4 rounded-lg shadow-md text-white bg-blue-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[0].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[0].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[0].value}</p>
                        <p className="mt-1 text-sm">Total number of vehicles in the fleet.</p>
                    </div>

                    {/* Available Vehicles */}
                    <div className="p-4 rounded-lg shadow-md text-white bg-green-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[1].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[1].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[1].value}</p>
                        <p className="mt-1 text-sm">Vehicles currently available for use.</p>
                    </div>

                    {/* Drivers Registered */}
                    <div className="p-4 rounded-lg shadow-md text-white bg-yellow-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[2].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[2].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[2].value}</p>
                        <p className="mt-1 text-sm">Total registered drivers in the system.</p>
                    </div>

                    {/* Upcoming Maintenance */}
                    <div className="p-4 rounded-lg shadow-md text-white bg-red-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[3].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[3].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[3].value}</p>
                        <p className="mt-1 text-sm">Number of vehicles scheduled for maintenance soon.</p>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="bg-gray-600 p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="text-lg font-medium">{activity.title}</h3>
                            <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
