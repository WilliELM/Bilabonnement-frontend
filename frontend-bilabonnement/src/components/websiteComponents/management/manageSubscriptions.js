// ManageSubscriptions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]); // State to store existing subscriptions
    const [newSubscription, setNewSubscription] = useState({
        buydate: '',
        substart: '',
        subend: '',
        kmstart: 0,
        kmdone: 0,
        kmplanned: 0,
        subtime: 0,
        carId: '', // Placeholder for car selection
        customerId: '', // Placeholder for customer selection
        damageReportId: '', // Placeholder for damage report selection
    });

    useEffect(() => {
        fetchSubscriptions();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSubscription({
            ...newSubscription,
            [name]: name.includes('km') || name === 'subtime' ? parseInt(value, 10) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://bilabonnementapi.azurewebsites.net/subscriptions', newSubscription)
            .then(response => {
                setNewSubscription({
                    buydate: '',
                    substart: '',
                    subend: '',
                    kmstart: 0,
                    kmdone: 0,
                    kmplanned: 0,
                    subtime: 0,
                    carId: '',
                    customerId: '',
                    damageReportId: '',
                });
                fetchSubscriptions();
            })
            .catch(error => {
                console.error('Error adding new subscription', error);
            });
    };

    const handleDelete = (subscriptionId) => {
        axios.delete(`https://bilabonnementapi.azurewebsites.net/subscriptions/${subscriptionId}`)
            .then(response => {
                fetchSubscriptions();
            })
            .catch(error => {
                console.error('Error deleting subscription', error);
            });
    };

    return (
        <div>
            <h2>Manage Subscriptions</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" name="buydate" value={newSubscription.buydate} onChange={handleChange} placeholder="Buy Date" />
                <input type="date" name="substart" value={newSubscription.substart} onChange={handleChange} placeholder="Subscription Start" />
                <input type="date" name="subend" value={newSubscription.subend} onChange={handleChange} placeholder="Subscription End" />
                <input type="number" name="kmstart" value={newSubscription.kmstart} onChange={handleChange} placeholder="KM Start" />
                <input type="number" name="kmdone" value={newSubscription.kmdone} onChange={handleChange} placeholder="KM Done" />
                <input type="number" name="kmplanned" value={newSubscription.kmplanned} onChange={handleChange} placeholder="KM Planned" />
                <input type="number" name="subtime" value={newSubscription.subtime} onChange={handleChange} placeholder="Subscription Time" />
                {/* Placeholder inputs for car, customer, and damage report selection */}
                {/* You will need to implement actual selection components */}
                <input type="text" name="carId" value={newSubscription.carId} onChange={handleChange} placeholder="Car ID" />
                <input type="text" name="customerId" value={newSubscription.customerId} onChange={handleChange} placeholder="Customer ID" />
                <input type="text" name="damageReportId" value={newSubscription.damageReportId} onChange={handleChange} placeholder="Damage Report ID" />
                <button type="submit">Add Subscription</button>
            </form>

            <h3>Subscription List</h3>
            <ul>
                {subscriptions.map(subscription => (
                    <li key={subscription.id}>
                        {subscription.substart} - {subscription.subend}
                        <button onClick={() => handleDelete(subscription.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageSubscriptions;
