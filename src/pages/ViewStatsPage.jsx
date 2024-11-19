import React from 'react';
import useFetchStats from './useFetchStats';
import DriverPerformanceTable from './DriverPerformanceTable';
import VehicleStatusTable from './VehicleStatusTable';
import MaintenanceOverview from './MaintenanceOverview';
import CompanyStats from './CompanyStats';

const ViewStatsPage = () => {
    const {
        driverStats,
        vehicleStats,
        companyStats,
        maintenanceRecords,
        loading,
        error
    } = useFetchStats();

    const categorizeMaintenance = () => {
        const today = new Date();
        const completed = [];
        const inProgress = [];
        const upcoming = [];

        maintenanceRecords.forEach((record) => {
            const maintenanceDate = new Date(record.maintenanceDate);
            if (record.status === 'completed') {
                completed.push(record);
            } else if (record.status === 'in-progress') {
                inProgress.push(record);
            } else if (record.status === 'upcoming' && maintenanceDate >= today) {
                upcoming.push(record);
            }
        });

        return { completed, inProgress, upcoming };
    };

    const { completed, inProgress, upcoming } = categorizeMaintenance();

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="bg-gray-650 min-h-screen flex items-center justify-center p-7">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl font-semibold text-white mb-6 text-center">Company Performance Stats</h2>

                <DriverPerformanceTable driverStats={driverStats} />
                <VehicleStatusTable vehicleStats={vehicleStats} />
                <MaintenanceOverview completed={completed} inProgress={inProgress} upcoming={upcoming} />
                <CompanyStats companyStats={companyStats} />
            </div>
        </div>
    );
};

export default ViewStatsPage;
