import './App.css';
import CarList from "./components/dataLists/carList";
import SubscriptionList from "./components/dataLists/subscriptionList";
import CustomerList from "./components/dataLists/customerList";
import Navbar from "./components/websiteComponents/navbar";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar />
                </header>
                <div className="content">ç
                    <Routes>
                        <Route path="/cars" element={<CarList />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/subscriptions" element={<SubscriptionList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )}

export default App;
