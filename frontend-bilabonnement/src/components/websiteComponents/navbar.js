import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [showCarsDropdown, setShowCarsDropdown] = useState(false);
    const [showCustomersDropdown, setShowCustomersDropdown] = useState(false);
    const [showSubscriptionsDropdown, setShowSubscriptionsDropdown] = useState(false);


    const toggleCarsDropdown = () => {
        setShowCarsDropdown(!showCarsDropdown);
    };

    const toggleCustomersDropdown = () => {
        setShowCustomersDropdown(!showCustomersDropdown);
    };

    const toggleSubscriptionsDropdown = () => {
        setShowSubscriptionsDropdown(!showSubscriptionsDropdown);
    };

    return (
        <nav className='navbar'>
            <ul className='navbar-list'>

                <li className='navbar-item'>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>

                <li className='navbar-item' onClick={toggleSubscriptionsDropdown}>
                    <Link to="/data"> <span className="navbar-link breeds-dropdown">Data</span> </Link>
                </li>

                <li className='navbar-item'>
                    <Link to="/management" className="navbar-link">Management</Link>
                </li>
                <li className='navbar-item' onClick={toggleCarsDropdown}>
                    <Link to="/KPI"><span className="navbar-link breeds-dropdown">KPI'er</span> </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

