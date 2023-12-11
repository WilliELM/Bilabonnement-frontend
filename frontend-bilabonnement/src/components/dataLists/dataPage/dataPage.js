// DataPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./dataPage.css"

const DataPage = () => {
    let navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
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
    );
};

export default DataPage;
