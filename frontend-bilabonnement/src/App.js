import './App.css';
import CarList from "./components/dataLists/cars/carList";
import SubscriptionList from "./components/dataLists/subscriptionList/subscriptionList";
import CustomerList from "./components/dataLists/Customers/customerList";
import Navbar from "./components/websiteComponents/navbar";
import Dashboard from './components/websiteComponents/dashboard/dashboard'; // Import the Dashboard component
import Management from "./components/websiteComponents/management/management";
import DamageList from "./components/dataLists/damagereportsList/damageList";
import DataPage from "./components/dataLists/dataPage/dataPage";

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                </header>
                <div className="content">
                    <Routes>
                        <Route path="/cars" element={<CarList/>} />
                        <Route path="/KPI" element={<Dashboard/>} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/subscriptions" element={<SubscriptionList />} />
                        <Route path="/management/*" element={<Management />} />
                        <Route path="/data" element={<DataPage/>} />
                        <Route path="/damagereports" element={<DamageList/>}/>

                    </Routes>
                </div>
            </div>
        </Router>
    )}

export default App;
