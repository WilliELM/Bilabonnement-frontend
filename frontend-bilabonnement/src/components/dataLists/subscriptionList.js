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
            {subscriptions.map(subscription => (
                <div key={subscription.id}>
                    <p>Sub {subscription.id} with date {subscription.buydate}</p>
                </div>
            ))}
        </div>
    );
}

export default SubscriptionList;
