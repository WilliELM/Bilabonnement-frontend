import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './dashboard.css';
import Navbar from "../navbar";

function Dashboard() {
    const [cars, setCars] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
            .then(response => setCars(response.data))
            .catch(error => console.error('Error fetching cars', error));

        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers', error));

        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error('Error fetching subscriptions', error));
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'DKK' }).format(price);
    };

    const totalCars = cars.length;
    const averagePrice = totalCars > 0 ? cars.reduce((acc, car) => acc + car.price, 0) / totalCars : 0;
    const availableCars = cars.filter(car => car.carFree).length;
    const totalCustomers = customers.length;
    const activeSubscriptions = subscriptions.filter(sub => sub.isActive).length;

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

    const doughnutChartConfig = {
        labels: ['Available', 'Unavailable'],
        datasets: [
            {
                label: 'Availability',
                data: [availableCars, totalCars - availableCars], // Replace with actual data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <header className="App-header">
                <Navbar />
            </header>
        <div className="dashboard">
            <div className="kpi">
                <h3>Total Cars</h3>
                <p>{totalCars}</p>
            </div>
            <div className="kpi">
                <h3>Average Price</h3>
                <p>{formatPrice(averagePrice)}</p>
            </div>
            <div className="kpi">
                <h3>Available Cars</h3>
                <p>{availableCars}</p>
            </div>
            <div className="kpi">
                <h3>Total Customers / Active Subscriptions</h3>
                <p>{totalCustomers}</p>
            </div>

            <div className="chart-container">
                <Bar data={barChartConfig} />
            </div>
            <div className="chart-container">
                <Doughnut data={doughnutChartConfig} />
            </div>
        </div>
        </div>
    );
}

export default Dashboard;
