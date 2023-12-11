import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newSubscription, setNewSubscription] = useState({
        buydate: '',
        substart: '',
        subend: '',
        kmstart: 0,
        kmdone: 0,
        kmplanned: 0,
        subtime: 0,
        car: null, // Change to an object
        customer: null, // Change to an object
    });
    const [cars, setCars] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); // Change to an object
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Change to an object

    useEffect(() => {
        fetchSubscriptions();
        fetchCars();
        fetchCustomers();
    }, []);

    const fetchSubscriptions = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscriptions', error);
            });
    };

    const fetchCars = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    };

    const fetchCustomers = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSubscription({
            ...newSubscription,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCar !== null && selectedCustomer !== null) {
            const updatedSubscription = {
                ...newSubscription,
                car: selectedCar,
                customer: selectedCustomer,
            };

            console.log('Submitting Subscription:', updatedSubscription);

            axios.post('https://bilabonnementapi.azurewebsites.net/subscriptions', updatedSubscription)
                .then(response => {
                    setNewSubscription({
                        buydate: '',
                        substart: '',
                        subend: '',
                        kmstart: 0,
                        kmdone: 0,
                        kmplanned: 0,
                        subtime: 0,
                        car: null,
                        customer: null,
                    });
                    setSelectedCar(null); // Reset selectedCar
                    setSelectedCustomer(null); // Reset selectedCustomer
                    fetchSubscriptions();
                })
                .catch(error => {
                    console.error('Error adding new subscription', error);
                });
        } else {
            console.error('Car or Customer not selected');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2> Create new Subscription </h2>
                <div className="description">Enter buy date</div>
                <input type="date" name="buydate" value={newSubscription.buydate} onChange={handleChange} placeholder="Buy Date" />
                <div className="description">Enter subscription start</div>
                <input type="date" name="substart" value={newSubscription.substart} onChange={handleChange} placeholder="Subscription Start" />
                <div className="description">Enter subscription end</div>
                <input type="date" name="subend" value={newSubscription.subend} onChange={handleChange} placeholder="Subscription End" />
                <div className="description">Enter Km start</div>
                <input type="number" name="kmstart" value={newSubscription.kmstart} onChange={handleChange} placeholder="KM Start" />
                <div className="description">Enter Km done</div>
                <input type="number" name="kmdone" value={newSubscription.kmdone} onChange={handleChange} placeholder="KM Done" />
                <div className="description">Enter Km planned</div>
                <input type="number" name="kmplanned" value={newSubscription.kmplanned} onChange={handleChange} placeholder="KM Planned" />
                <div className="description">Enter Subscription time (months)</div>
                <input type="number" name="subtime" value={newSubscription.subtime} onChange={handleChange} placeholder="Subscription Time" />

                {/* Car and Customer dropdown selection */}
                <div className="description">Select Car</div>
                <select name="car" onChange={(e) => setSelectedCar(cars.find(car => car.id === parseInt(e.target.value, 10)))} value={selectedCar ? String(selectedCar.id) : ''}>
                    <option value="" disabled>Select Car</option>
                    {cars.map(car => (
                        <option key={car.id} value={String(car.id)}>
                            {`${car.brand} ${car.model} - ${car.id}`}
                        </option>
                    ))}
                </select>

                <div className="description">Select Customer</div>
                <select name="customer" onChange={(e) => setSelectedCustomer(customers.find(customer => customer.id === parseInt(e.target.value, 10)))} value={selectedCustomer ? String(selectedCustomer.id) : ''}>
                    <option value="" disabled>Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={String(customer.id)}>
                            {`${customer.firstName} ${customer.lastName} - ${customer.id}`}
                        </option>
                    ))}
                </select>

                <button className="Button-update" type="submit">
                    Create Subscription
                </button>
            </form>
        </div>
    );
}

export default ManageSubscriptions;
