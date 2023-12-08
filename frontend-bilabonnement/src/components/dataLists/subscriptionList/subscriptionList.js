import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./subscriptionList.css"

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        // Fetch data from API
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error('Error fetching subscriptions', error));
    }, []);

    const handleDelete = subscriptionId => {
        // Implement delete functionality
        axios.delete(`https://bilabonnementapi.azurewebsites.net/subscriptions/${subscriptionId}`)
            .then(() => {
                // Remove the deleted subscription from the state
                setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
            })
            .catch(error => console.error('Error deleting subscription', error));
    };

    const handleEdit = subscription => {
        // Implement edit functionality
        // For example, set a state to show an edit form
        console.log('Edit functionality not implemented yet');
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedSubscriptions = React.useMemo(() => {
        let sortableItems = [...subscriptions];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [subscriptions, sortConfig]);

    return (
        <div className="page-container">
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('buydate')}>Buy Date</th>
                    <th onClick={() => handleSort('substart')}>Subscription Start</th>
                    <th onClick={() => handleSort('subend')}>Subscription End</th>
                    <th onClick={() => handleSort('kmstart')}>Kilometers Start</th>
                    <th onClick={() => handleSort('kmdone')}>Kilometers Done</th>
                    <th onClick={() => handleSort('kmplanned')}>Kilometers Planned</th>
                    <th onClick={() => handleSort('subtime')}>Subscription Time</th>
                    <th onClick={() => handleSort('customer.id')}>Customer ID</th>
                    <th onClick={() => handleSort('car.id')}>Car ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedSubscriptions.map(subscription => (
                    <tr key={subscription.id}>
                        <td>{subscription.buydate}</td>
                        <td>{subscription.substart}</td>
                        <td>{subscription.subend}</td>
                        <td>{subscription.kmstart}</td>
                        <td>{subscription.kmdone}</td>
                        <td>{subscription.kmplanned}</td>
                        <td>{subscription.subtime} months</td>
                        <td>{subscription.customer.id}</td>
                        <td>{subscription.car.id}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(subscription)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(subscription.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubscriptionList;
