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

                <li className='navbar-item' onClick={toggleCarsDropdown}>
                    <Link to="/cars"><span className="navbar-link breeds-dropdown">Cars</span> </Link>
                </li>

                <li className='navbar-item' onClick={toggleCustomersDropdown}>
                     <span className="navbar-link breeds-dropdown">Customers</span>
                </li>

                <li className='navbar-item' onClick={toggleSubscriptionsDropdown}>
                    <Link to="/subscriptions"> <span className="navbar-link breeds-dropdown">Subscriptions</span> </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

