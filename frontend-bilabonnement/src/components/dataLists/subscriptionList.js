import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarList from "./carList";

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    }, []);

    return (
        <div>
            {subscriptions.map(subscription => (
                <div className="container" key={subscription.id}>

                        <h2>Subscription Details</h2>
                        <p>Buy Date: {subscription.buydate}</p>
                        <p>Subscription Start: {subscription.substart}</p>
                        <p>Subscription End: {subscription.subend}</p>
                        <p>Kilometers Start: {subscription.kmstart}</p>
                        <p>Kilometers Done: {subscription.kmdone}</p>
                        <p>Kilometers Planned: {subscription.kmplanned}</p>
                        <p>Subscription Time: {subscription.subtime} months</p>

                        {/* Display car details */
                        <h3>Car Details</h3>}
                        <p>CarID: {subscription.car.id}</p>
                        <p>Name of car: {subscription.car.brand} {subscription.car.model}</p>
                        <p>Price: {subscription.car.price} kr.</p>
                        <p>{subscription.car.carFree}</p>

                        {/* Display customer details */}
                        <h3>Customer Details</h3>
                        <p>CustomerID: {subscription.customer.id}</p>
                        <p>Full name: {subscription.customer.firstName} {subscription.customer.lastName}</p>
                        <p>Address: {subscription.customer.address}</p>
                        <p>Phone number: {subscription.customer.phone}</p>
                        <p>Email: {subscription.customer.email}</p>
                        <p>CPR: {subscription.customer.cpr}</p>


                    {}
                </div>
            ))}
        </div>
    );
}

export default SubscriptionList;
