import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './landingPage.css';
import Navbar from '../navBar/navbar';
import KpiCard from "./landingKPICard";
import Alarm from "./alarms/alarmsComponent";


function calculateTotalRevenue(subscriptions) {
    return subscriptions.reduce((total, sub) => total + (sub.subcost || 0), 0);
}

function calculateARPU(subscriptions, customers) {
    const totalRevenue = calculateTotalRevenue(subscriptions);
    const uniqueCustomers = new Set(customers.map(customer => customer.id)).size;
    return uniqueCustomers ? (totalRevenue / uniqueCustomers) : 0;
}


const calculateAverageSubscriptionLength = (subscriptions) => {
    const totalSubTime = subscriptions.reduce((acc, sub) => acc + sub.subtime, 0);
    return subscriptions.length > 0 ? totalSubTime / subscriptions.length : 0;
};


function LandingPage() {
    const [cars, setCars] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [damageReports, setDamageReports] = useState([]);


    useEffect(() => {
        // Replace with your actual API endpoint URLs
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
            .then(response => setCars(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => setCustomers(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => setSubscriptions(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/damagereports')
            .then(response => setDamageReports(response.data));

    }, []);

    //Values til alarmer

    const alarmvalues = [

    ]
    // Tilføjelse af alarmer på startside
    const alarms = [
        { title: 'Revenue Alert', message: 'Revenue is below the set threshold.', isCritical: true },
        { title: 'ARPU Alert', message: 'ARPU is lower than last month.', isCritical: false },
        { title: 'Damage costs Alert ', message: 'Damage costs are higher than expected', isCritical: true },
        { title: 'Car value Alert ', message: 'Total car value is lower than expected', isCritical: true },
        { title: 'Car stock Alert ', message: 'Few cars in stock', isCritical: true }

    ];

    
    const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.subcost, 0);
    const totalCustomers = new Set(subscriptions.map(sub => sub.customer.id)).size;
    const totalCarValue = cars.reduce((acc, car) => acc + car.price, 0);
    const totalAvailableCars = cars.length - subscriptions.length;
    const totalDamageCost = damageReports.reduce((acc, report) => acc + report.repairCost + report.cleaningCost, 0);
    const averageSubscriptionLength = calculateAverageSubscriptionLength(subscriptions);
    const arpu = calculateARPU(subscriptions,customers)


    // Bar chart data
    const barChartData = {
        labels: ['Total Revenue', 'Total Damage Costs'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [totalRevenue, totalDamageCost],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    // Mock data for charts
    const barChartConfig = {
        labels: cars.map(car => car.brand),
        datasets: [
            {
                label: 'Price for Rented Out Cars',
                data: cars.map(car => car.price),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div>
            <header>
                <Navbar/>
            </header>
<div className="landingPageContainer">
        <div className="dashboard">
            <div className="alarms-sidebar">
                {alarms.map((alarm, index) => (
                    <Alarm key={index} title={alarm.title} message={alarm.message} isCritical={alarm.isCritical} />
                ))}
            </div>
            <div className="kpi-section">
                <KpiCard title="Total Revenue" value={` ${totalRevenue.toFixed(2)},-`} />
                <KpiCard title="ARPU " description={"(average revenue per unit)"} value={` ${arpu.toFixed(2)},-`} />
                <KpiCard title="Average Subscription Length" value={`${averageSubscriptionLength.toFixed(2)} months`} />
                <KpiCard title="Total Damage Costs" value={`${totalDamageCost.toFixed(2)},-`} />
                <KpiCard title="Total Car Value" value={` ${totalCarValue.toFixed(2)},-`} />
                <KpiCard title="Total Available Cars" value={` ${totalAvailableCars}`} />
                {/* Add more KpiCard components as needed */}
            </div>
            <div className="charts-container">
                <div className="chart-container">
                    <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                </div>
                <div className="chart-container">
                    <Bar data={barChartConfig} options={{ maintainAspectRatio: false }} />
                </div>
                {/* Add more chart containers as needed */}
            </div>
        </div>
</div>
        </div>

    );
}

export default LandingPage;