import PropTypes from 'prop-types';

const Navbar = ({ setActiveForm }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-center items-center">
                {/* Centering the H1 and making it a clickable link */}
                <a href="/" className="text-white text-2xl font-semibold hover:underline">
                    Fleet Management
                </a>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => setActiveForm('addDriver')}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Add Driver
                </button>
                <button
                    onClick={() => setActiveForm('addFleetUsage')}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                    Add Fleet Usage
                </button>
                <button
                    onClick={() => setActiveForm('addMaintenance')}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                    Add Maintenance
                </button>
                <button
                    onClick={() => setActiveForm('addStats')}
                    className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
                >
                    View Stats
                </button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    setActiveForm: PropTypes.func.isRequired,
};

export default Navbar;

