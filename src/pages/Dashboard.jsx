import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddDriverForm from './AddDrivers';
import AddFleetUsageForm from './AddFleetUsage';
import AddMaintenanceForm from './AddMaintenanceForm';
import ViewStatsPage from './ViewStatsPage';
import '../App.jsx';

const Dashboard = () => {
    const [dashboardStats, setDashboardStats] = useState([
        { icon: '🚚', title: 'Total Vehicles', value: 0 },
        { icon: '🟢', title: 'Available Vehicles', value: 0 },
        { icon: '👷‍♂️', title: 'Drivers Registered', value: 0 },
        { icon: '🛠️', title: 'Upcoming Maintenance', value: 0 },
    ]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [activeForm, setActiveForm] = useState('');

    // State to manage maintenance data
    const [vehicleId, setVehicleId] = useState('');
    const [maintenanceType, setMaintenanceType] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledDuration, setScheduledDuration] = useState('');

    // Function to render the active form (Add Driver, Add Maintenance, etc.)
    const renderActiveForm = () => {
        switch (activeForm) {
            case 'addDriver':
                return <AddDriverForm onAddDriver={handleAddDriver} />;
            case 'addFleetUsage':
                return <AddFleetUsageForm onAddFleet={handleAddFleet} onFleetUsageChange={handleFleetUsageChange} />;
            case 'addMaintenance':
                return <AddMaintenanceForm
                    onAddMaintenance={handleAddMaintenance}
                    onSubmit={handleSubmit}
                    vehicleId={vehicleId}
                    maintenanceType={maintenanceType}
                    maintenanceDate={maintenanceDate}
                    description={description}
                    scheduledDuration={scheduledDuration}
                    setVehicleId={setVehicleId}
                    setMaintenanceType={setMaintenanceType}
                    setMaintenanceDate={setMaintenanceDate}
                    setDescription={setDescription}
                    setScheduledDuration={setScheduledDuration}
                />;
            case 'addStats':
                return <ViewStatsPage />;
            default:
                return null;
        }
    };

    // Function to handle fleet addition
    const handleAddFleet = (newFleetData) => {
        console.log('New fleet added:', newFleetData);
        updateDashboardStat(0, 1); // Increment total vehicles
        updateDashboardStat(1, 1); // Increment available vehicles
    };

    // Function to handle fleet usage change
    const handleFleetUsageChange = (isAvailable) => {
        console.log('Fleet usage updated, isAvailable:', isAvailable);
        if (isAvailable) {
            updateDashboardStat(1, 1); // Increment available vehicles
        } else {
            updateDashboardStat(1, -1); // Decrement available vehicles
        }
    };

    // Function to handle driver addition
    const handleAddDriver = (newDriverData) => {
        console.log('Driver registered:', newDriverData);
        updateDashboardStat(2, 1); // Increment driver count
    };

    // Function to handle maintenance addition
    const handleAddMaintenance = (maintenanceData) => {
        console.log('Adding maintenance:', maintenanceData);
        updateDashboardStat(3, 1); // Increment upcoming maintenance count
        updateDashboardStat(1, -1); // Decrement available vehicles
    };

    // Function to handle form submit (Generalized)
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from reloading the page

        // Extracting form data from state
        const maintenanceData = {
            vehicleId,
            maintenanceType,
            maintenanceDate,
            description,
            scheduledDuration,
        };

        // Log the data for debugging
        console.log("Submitting maintenance data:", maintenanceData);

        // Form validation (check if all required fields are filled)
        if (!maintenanceData.vehicleId || !maintenanceData.maintenanceType || !maintenanceData.maintenanceDate) {
            alert("Please fill in all required fields.");
            return;
        }

        // Send the data to the backend using fetch
        fetch('http://localhost:8000/api/add-maintenance', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(maintenanceData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Maintenance data submitted successfully:', data);

                // After successful submission, update the dashboard stats
                handleAddMaintenance(maintenanceData);  // Update the upcoming maintenance count and available vehicles

                // Optionally, clear the form data after submission
                setVehicleId('');
                setMaintenanceType('');
                setMaintenanceDate('');
                setDescription('');
                setScheduledDuration('');
            })
            .catch((error) => {
                console.error('Error submitting maintenance data:', error);
                alert('There was an error submitting the maintenance data. Please try again.');
            });
    };


    // Function to update dashboard stats dynamically
    const updateDashboardStat = (index, change) => {
        setDashboardStats((prevStats) => {
            const updatedStats = [...prevStats];
            updatedStats[index].value += change;
            return updatedStats;
        });
    };

    // Fetch dashboard stats and recent activities from backend
    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard-stats')
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
            <Navbar setActiveForm={setActiveForm} />
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {renderActiveForm()}
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    {/* Display Dashboard Stats */}
                    <div className="p-4 rounded-lg shadow-md text-white bg-blue-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[0].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[0].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[0].value}</p>
                        <p className="mt-1 text-sm">Total number of vehicles in the fleet.</p>
                    </div>

                    <div className="p-4 rounded-lg shadow-md text-white bg-green-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[1].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[1].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[1].value}</p>
                        <p className="mt-1 text-sm">Vehicles currently available for use.</p>
                    </div>

                    <div className="p-4 rounded-lg shadow-md text-white bg-yellow-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[2].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[2].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[2].value}</p>
                        <p className="mt-1 text-sm">Total registered drivers in the system.</p>
                    </div>

                    <div className="p-4 rounded-lg shadow-md text-white bg-red-600 flex flex-col items-center">
                        <div className="text-4xl">{dashboardStats[3].icon}</div>
                        <h3 className="text-lg font-semibold mt-2">{dashboardStats[3].title}</h3>
                        <p className="text-3xl font-bold mt-2">{dashboardStats[3].value}</p>
                        <p className="mt-1 text-sm">Number of vehicles scheduled for maintenance soon.</p>
                    </div>
                </div>

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
