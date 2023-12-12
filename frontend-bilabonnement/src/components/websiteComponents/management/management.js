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
    const location = useLocation();

    const handleNavLinkClick = () => {
        setShowDescription(false);
    };

    useEffect(() => {
        if (location.pathname === '/management') {
            setShowDescription(true);
        } else {
            setShowDescription(false);
        }
    }, [location.pathname]);

    return (
        <div>
            <header className="Dashboard">
                <Navbar />
            </header>
            <div className="management">
                <nav className="management-nav">
                    <NavLink to="cars" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaCar /> Opret biler
                    </NavLink>
                    <NavLink to="customers" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaUser /> Opret kunder
                    </NavLink>
                    <NavLink to="subscriptions" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaClipboardList /> Opret abonnementer
                    </NavLink>
                    <NavLink to="dmgreports" onClick={handleNavLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>
                        <FaExclamationTriangle /> Opret skades rapporter
                    </NavLink>
                </nav>
                    {showDescription && (
                        <div>
                    <h2>Administration</h2>
                        <div className="management-description">Tryk på en af ovenstående knapper for at oprette nye biler, kunder, abonnementer eller skaderapporter.</div>
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
