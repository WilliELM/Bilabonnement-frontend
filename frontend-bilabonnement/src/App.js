import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import CarList from "./components/lists/carList";
import SubscriptionList from "./components/lists/subscriptionList";
import CustomerList from "./components/lists/customerList";
import Navbar from "./components/websiteComponents/navbar";

function App() {
  return (
      <Router>
          <div className="App">
              <header className="App-header">
                  <Navbar />
              </header>
              <div className="content">
              <Link to="/cars" className="navbar-link"> <button> Show Cars </button> </Link>
              <Routes>
                  <Route path="/cars" element={<CarList />} />
                  <Route path="/customers" element={<CustomerList />} />
                  <Route path="/subscriptions" element={<SubscriptionList />} />
              </Routes>
              </div>
          </div>
      </Router>

  );
}

/*<CarList></CarList>
        <SubscriptionList></SubscriptionList>
        <CustomerList></CustomerList>*/

export default App;
