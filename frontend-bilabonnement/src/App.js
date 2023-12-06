import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import CarList from "./components/lists/carList";
import SubscriptionList from "./components/lists/subscriptionList";
import CustomerList from "./components/lists/customerList";

function App() {
  return (
      <Router>
          <div className="App">
              <Link to="/cars" className="navbar-link"> <button  > Show Cars </button> </Link>
              <Routes>
                  <Route path="/cars" element={<CarList />} />
              </Routes>
          </div>
      </Router>

  );
}

/*<CarList></CarList>
        <SubscriptionList></SubscriptionList>
        <CustomerList></CustomerList>*/

export default App;
