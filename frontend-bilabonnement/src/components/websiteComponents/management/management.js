import React from 'react';
import {Link, Routes, Route, Router} from 'react-router-dom';
import ManageCars from './ManageCars'; // Assume you have a ManageCars component
import ManageCustomers from './manageCustomers'; // Assume you have a ManageCustomers component
import ManageSubscriptions from './manageSubscriptions'; // Assume you have a ManageSubscriptions component
import './management.css'; // You will need to create this CSS file for styling

function Management() {
    return (

        <div className="management">
            <h1>Management Dashboard</h1>
            <nav className="management-nav">
                <Link to="cars">Manage Cars</Link>
                <Link to="customers">Manage Customers</Link>
                <Link to="subscriptions">Manage Subscriptions</Link>
            </nav>

            <Routes>
                <Route path="cars" element={<ManageCars />} />
                <Route path="customers" element={<ManageCustomers />} />
                <Route path="subscriptions" element={<ManageSubscriptions />} />
            </Routes>
        </div>

    );
}

export default Management;
