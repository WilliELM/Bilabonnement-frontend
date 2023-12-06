import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h1> Subscriptions </h1>
            <li className="image-container">
                {subscriptions.map(subscription => (
                    <div key={subscription.id}>
                        <p className="subscription-card">Sub {subscription.id} with date {subscription.buydate}</p>
                    </div>
                ))}
            </li>

        </div>
    );
}

export default SubscriptionList;
