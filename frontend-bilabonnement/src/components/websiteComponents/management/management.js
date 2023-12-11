import React from 'react';
import {Link, Routes, Route, Router} from 'react-router-dom';
import ManageCars from './ManageCars';
import ManageCustomers from './manageCustomers';
import ManageSubscriptions from './manageSubscriptions';
import { NavLink } from 'react-router-dom';

import './management.css';
import Navbar from "../navBar/navbar";

function Management() {
    return (
        <div>
            <header className="App-header">
                <Navbar />
            </header>
        <div className="management">
            <nav className="management-nav">
                <NavLink to="cars" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Cars</NavLink>
                <NavLink to="customers" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Customers</NavLink>
                <NavLink to="subscriptions" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Subscriptions</NavLink>
            </nav>
            <h2>Management</h2>
            <div>Press one of the above buttons to create new cars, customers or subscriptions</div>
            <Routes>
                <Route path="cars" element={<ManageCars />} />
                <Route path="customers" element={<ManageCustomers />} />
                <Route path="subscriptions" element={<ManageSubscriptions />} />
            </Routes>
        </div>
        </div>

    );
}

export default Management;
