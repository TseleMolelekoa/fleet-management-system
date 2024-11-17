import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStatsPage from './pages/AddStatsPage';
import AddFleetUsage from './pages/AddFleetUsage';
import AddDrivers from './pages/AddDrivers';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/fleet-management" element={<Dashboard />} />
                <Route path="/add-stats" element={<AddStatsPage />} />
                <Route path="/add-fleet-usage" element={<AddFleetUsage />} />
                <Route path="/add-drivers" element={<AddDrivers />} />
            </Routes>
        </Router>
    );
}

export default App;