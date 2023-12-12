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
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
            .then(response => setCars(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => setCustomers(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => setSubscriptions(response.data));
        axios.get('https://bilabonnementapi.azurewebsites.net/damagereports')
            .then(response => setDamageReports(response.data));

    }, []);

    const alarms = [
        { title: 'Indtægtsadvarsel', message: 'Indtægter er under den fastsatte grænse', isCritical: true },
        { title: 'ARPU-advarsel (Gennemsnitlig indtægt Pr. enhed)', message: ' ARPU er lavere end sidste måned', isCritical: false },
        { title: 'Skadeomkostningsadvarsel ', message: 'Skadeomkostninger er højere end forventet', isCritical: true },
        { title: 'Bilværdiadvarsel ', message: 'Samlet bilværdi er lavere end forventet', isCritical: true },
        { title: 'Bilbeholdningsadvarsel ', message: 'Få biler på lager', isCritical: true }

    ];

    const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.subcost, 0);
    const totalCarValue = cars.reduce((acc, car) => acc + car.price, 0);
    const totalAvailableCars = cars.length - subscriptions.length;
    const totalDamageCost = damageReports.reduce((acc, report) => acc + report.repairCost + report.cleaningCost, 0);
    const averageSubscriptionLength = calculateAverageSubscriptionLength(subscriptions);
    const arpu = calculateARPU(subscriptions,customers)

    const barChartData = {
        labels: ['Samlet Indtægt', 'Samlede Skadeomkostninger'],
        datasets: [
            {
                label: 'Økonomisk Overblik',
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

    const barChartConfig = {
        labels: cars.map(car => car.brand),
        datasets: [
            {
                label: 'Pris for udlejede biler',
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
                                <KpiCard title="Totalindtægt" value={` ${totalRevenue.toFixed(0)},-`} />
                                <KpiCard title="ARPU " description={"(gennemsnitligt indtægt per enhed)"} value={` ${arpu.toFixed(2)},-`} />
                                <KpiCard title="Gennemsnitlig Abonnementslængde" value={`${averageSubscriptionLength.toFixed(2)} måneder`} />
                                <KpiCard title="Samlede Skadeomkostninger" value={`${totalDamageCost.toFixed(0)},-`} />
                                <KpiCard title="Samlet Bilværdi" value={` ${totalCarValue.toFixed(0)},-`} />
                                <KpiCard title="Samlede Tilgængelige Biler" value={` ${totalAvailableCars}`} />
                            </div>
                        <div className="charts-container">
                            <div className="chart-container">
                                    <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className="chart-container">
                                    <Bar data={barChartConfig} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;