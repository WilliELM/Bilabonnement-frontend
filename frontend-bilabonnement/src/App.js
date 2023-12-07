import logo from './logo.svg';
import './App.css';
import CarList from "./components/carList";
import SubscriptionList from "./components/subscriptionList";
import CustomerList from "./components/customerList";

function App() {
  return (
    <div className="App">
        <p>
            <CarList></CarList>
            <SubscriptionList></SubscriptionList>
            <CustomerList></CustomerList>

            <div>Hello</div>
        </p>
    </div>
  );
}

export default App;
