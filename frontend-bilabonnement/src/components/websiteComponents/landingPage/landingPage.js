import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

function LandingPage () {
    return (
        <div className="landing-page">
            <h1> Developer App </h1>
            <div className="features">
                <Link className="cards" to="/data">
                    <span role="img" aria-label="Person Icon">👤</span> Data <div className="explanation"> <p> Oversigt over biler, kunder, abonnementer & skades reporter  </p> </div>
                </Link>
                <Link className="cards" to="/management">
                      <span role="img" aria-label="Settings Icon">⚙️</span> Management <div className="explanation"> <p> Her kan du lave nye biler, kunder og abonnementer </p> </div>
                </Link>
                <Link className="cards" to="/KPI">
                    <span role="img" aria-label="Chart Icon">📊</span> KPI/Dashboard <div className="explanation"> <p> Oversigt på KPI'er  </p> </div>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
