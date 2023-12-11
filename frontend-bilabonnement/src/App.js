import './App.css';
import CarList from "./components/dataLists/cars/carList";
import SubscriptionList from "./components/dataLists/subscriptionList/subscriptionList";
import CustomerList from "./components/dataLists/customerList";
import Dashboard from './components/websiteComponents/dashboard/dashboard';
import Management from "./components/websiteComponents/management/management";
import LandingPage from "./components/websiteComponents/landingPage/landingPage";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<LandingPage/>} />
                        <Route path="/cars" element={<CarList/>} />
                        <Route path="/KPI" element={<Dashboard/>} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/subscriptions" element={<SubscriptionList />} />
                        <Route path="/management/*" element={<Management />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )}

export default App;
