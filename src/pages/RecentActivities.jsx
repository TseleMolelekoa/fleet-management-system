import { useState, useEffect } from 'react';
import { FaWrench, FaUserPlus, FaTruck, FaFileAlt, FaSignInAlt, FaBell } from 'react-icons/fa';

import PropTypes from 'prop-types';

const RecentActivities = ({ activities }) => {
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filterType, setFilterType] = useState('all'); // State to track the current filter
    const [searchQuery, setSearchQuery] = useState(''); // State to track the search query
    const [page, setPage] = useState(1); // Pagination page
    const itemsPerPage = 5; // Number of activities to show per page

    // Update filtered activities based on search and filter criteria
    useEffect(() => {
        const filtered = activities
            .filter((activity) =>
                filterType === 'all' ? true : activity.type === filterType
            )
            .filter((activity) =>
                searchQuery === '' ? true : activity.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

        setFilteredActivities(filtered);
    }, [activities, filterType, searchQuery]);

    // Paginate filtered activities
    const paginatedActivities = filteredActivities.slice(0, page * itemsPerPage);

    // Load more function for pagination
    const loadMoreActivities = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Function to handle filtering based on dropdown selection
    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
        setPage(1); // Reset pagination when filter changes
    };

    // Function to handle search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset pagination when search changes
    };

    return (
        <div className="bg-gray-600 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>

            {/* Filter Dropdown and Search Bar */}
            <div className="flex justify-between mb-4">
                <select
                    className="p-2 rounded bg-gray-800 text-white"
                    value={filterType}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Activities</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="driver">Driver Updates</option>
                    <option value="fleet">Fleet Changes</option>
                    <option value="report">Performance Reports</option>
                    <option value="login">Login Events</option>
                    <option value="alert">Alerts</option>
                </select>

                <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 rounded bg-gray-800 text-white w-1/3"
                />
            </div>

            {/* Activity List with Highlight for New Activities */}
            {paginatedActivities.map((activity, index) => (
                <div
                    key={index}
                    className={`mb-3 flex items-center ${
                        activity.isNew ? 'bg-gray-700' : ''
                    } p-2 rounded`}
                >
                    <div className="mr-3">
                        {/* Render appropriate icon based on activity type */}
                        {activity.type === 'maintenance' && <FaWrench className="text-yellow-300" />}
                        {activity.type === 'driver' && <FaUserPlus className="text-blue-400" />}
                        {activity.type === 'fleet' && <FaTruck className="text-green-400" />}
                        {activity.type === 'report' && <FaFileAlt className="text-purple-400" />}
                        {activity.type === 'login' && <FaSignInAlt className="text-orange-400" />}
                        {activity.type === 'alert' && <FaBell className="text-red-400" />}
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">
                            {activity.title}
                            {activity.isNew && (
                                <span className="ml-2 text-sm text-green-500">(New)</span>
                            )}
                        </h3>
                        <p className="text-sm text-gray-300">{activity.description}</p>
                        <p className="text-xs text-gray-400">{activity.date}</p>
                    </div>
                </div>
            ))}

            {/* Load More Button for Pagination */}
            {page * itemsPerPage < filteredActivities.length && (
                <button
                    onClick={loadMoreActivities}
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

RecentActivities.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            isNew: PropTypes.bool,
        })
    ).isRequired,
};

export default RecentActivities;
