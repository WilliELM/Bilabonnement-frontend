import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ManageCars from './ManageCars';
import ManageCustomers from './manageCustomers';
import ManageSubscriptions from './manageSubscriptions';
import ManageDmgReports from './manageDmgreports';
import { NavLink } from 'react-router-dom';
import { FaCar, FaUser, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

import './management.css';
import Navbar from "../navBar/navbar";

function Management() {
    const [showDescription, setShowDescription] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavLinkClick = () => {
        setShowDescription(true);
    };

    useEffect(() => {
        // Show the description when navigating to "/management"
        if (location.pathname === '/management') {
            setShowDescription(true);
        } else {
            setShowDescription(false);
        }
    }, [location.pathname]);

    return (
        <div>
            <header className="App-header">
                <Navbar />
            </header>
            <div className="management">
                <nav className="management-nav">
                    <NavLink to="cars" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaCar /> Create Cars
                    </NavLink>
                    <NavLink to="customers" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaUser /> Create Customers
                    </NavLink>
                    <NavLink to="subscriptions" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaClipboardList /> Create Subscriptions
                    </NavLink>
                    <NavLink to="dmgreports" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaExclamationTriangle /> Create Damage Reports
                    </NavLink>
                </nav>
                {showDescription && (
                    <div>
                <h2>Management</h2>
                    <div className="management-description">Press one of the above buttons to create new cars, customers, subscriptions, or damage reports</div>
                    </div>
                )}
                <Routes>
                    <Route path="cars" element={<ManageCars />} />
                    <Route path="customers" element={<ManageCustomers />} />
                    <Route path="subscriptions" element={<ManageSubscriptions />} />
                    <Route path="dmgreports" element={<ManageDmgReports />} />
                </Routes>
            </div>
        </div>
    );
}

export default Management;
