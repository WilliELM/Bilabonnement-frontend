// DataPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dataPage.css';
import Navbar from '../../websiteComponents/navBar/navbar';

const DataPage = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="app">
            <header className="dashboard">
                <Navbar />
            </header>

                <div>
                    <h2> Select ur destination </h2>
                    <div className="management-description">Press one of the buttons to see your specific data
                    </div>
                </div>
            <div className="data-page-container">
                <div className="card customers" onClick={() => navigateTo('/customers')}>
                    <div className="card-title">Customers</div>
                </div>
                <div className="card cars" onClick={() => navigateTo('/cars')}>
                    <div className="card-title">Cars</div>
                </div>
                <div className="card subscriptions" onClick={() => navigateTo('/subscriptions')}>
                    <div className="card-title">Subscriptions</div>
                </div>
                <div className="card damagereports" onClick={() => navigateTo('/damagereports')}>
                    <div className="card-title">Damage Reports</div>
                </div>
            </div>
        </div>
    );
};

export default DataPage;
