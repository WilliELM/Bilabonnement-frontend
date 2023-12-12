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
                    <h2> Vælg din destination </h2>
                    <div className="management-description">Tryk på en af knapperne for at se dine specifikke data </div>
                </div>
                    <div className="data-page-container">
                        <div className="card customers" onClick={() => navigateTo('/customers')}>
                            <div className="card-title">Kunder</div>
                        </div>
                        <div className="card cars" onClick={() => navigateTo('/cars')}>
                            <div className="card-title">Biler</div>
                        </div>
                        <div className="card subscriptions" onClick={() => navigateTo('/subscriptions')}>
                            <div className="card-title">Abonnementer</div>
                        </div>
                        <div className="card damagereports" onClick={() => navigateTo('/damagereports')}>
                            <div className="card-title">Skadesrapporter</div>
                        </div>
                    </div>
        </div>
    );
};

export default DataPage;
