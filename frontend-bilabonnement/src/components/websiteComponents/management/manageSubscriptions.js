// ManageSubscriptions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./management.css"

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
        carId: '', 
        customerId: '', 
        damageReportId: '', 
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


                {/* Placeholder inputs for car, customer, and damage report selection */}
                <input type="text" name="carId" value={newSubscription.carId} onChange={handleChange} placeholder="Car ID" />
                <input type="text" name="customerId" value={newSubscription.customerId} onChange={handleChange} placeholder="Customer ID" />
                <input type="text" name="damageReportId" value={newSubscription.damageReportId} onChange={handleChange} placeholder="Damage Report ID" />
                <button className="Button-update" type="submit">Create Subscription</button>
            </form>


        </div>
    );
}

export default ManageSubscriptions;
