import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css"
function Navbar() {
    return (
        <nav className='navbar'>
            <Link to="/" className="navbar-logo">
                <img src={"https://i.gyazo.com/3a2b47a272cfb9a4bff28f1ff2d79a52.png"} alt="Company Logo" />
            </Link>
            <ul className='navbar-list'>
                <li className='navbar-item'>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className='navbar-item'>
                    <Link to="/data" className="navbar-link">Data</Link>
                </li>
                <li className='navbar-item'>
                    <Link to="/management" className="navbar-link">Management</Link>
                </li>
                <li className='navbar-item'>
                    <Link to="/KPI" className="navbar-link">KPI'er</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
