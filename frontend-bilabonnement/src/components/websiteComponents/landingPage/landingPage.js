import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';

function LandingPage () {
    return (
        <div className="landing-page">
            <h1>Bil abonnement develeoper app </h1>
            <div className="features">
                <Link className="cards" to="/cars">
                    <span role="img" aria-label="Car Icon">🚗</span> Biler <div className="explanation"> <p> Oversigt over biler  </p> </div>
                </Link>
                <Link className="cards" to="/customers">
                    <span role="img" aria-label="Person Icon">👤</span> Kunder <div className="explanation"> <p> Oversigt over kunder  </p> </div>
                </Link>
                <Link className="cards" to="/subscriptions">
                    <span role="img" aria-label="Document Icon">📄</span> Abonnementer <div className="explanation"> <p> Oversigt over abonnementer  </p> </div>
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
