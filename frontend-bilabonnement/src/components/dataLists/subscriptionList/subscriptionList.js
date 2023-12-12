import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./subscriptionList.css";
import EditSubscriptionModal from "./editSubscriptionList";
import Navbar from "../../websiteComponents/navBar/navbar";

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [sortConfig, setSortConfig] = useState(null);

    useEffect(() => {
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscriptions', error);
            });
    }, []);

    const handleDelete = subscriptionId => {
        axios.delete(`https://bilabonnementapi.azurewebsites.net/subscriptions/${subscriptionId}`)
            .then(() => {
                setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
            })
            .catch(error => {
                console.error('Error deleting subscription', error);
            });
    };

    const handleEditClick = (subscription) => {
        setEditingSubscription(subscription);
    };


    const handleUpdate = updatedSubscription => {
        axios.put(`https://bilabonnementapi.azurewebsites.net/subscriptions/${updatedSubscription.id}`, updatedSubscription)
            .then(() => {
                setSubscriptions(subscriptions.map(sub => sub.id === updatedSubscription.id ? updatedSubscription : sub));
                setEditingSubscription(null);
            })
            .catch(error => {
                console.error('Error updating subscription', error);
            });
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
        <div>
            <header className="Dashboard">
                <Navbar />
            </header>
                <div className="page-container">
                    {editingSubscription && (
                        <EditSubscriptionModal
                            subscription={editingSubscription}
                            onClose={() => setEditingSubscription(null)}
                            onSave={handleUpdate}
                        />
                    )}
                <div className="table-air">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>Id</th>
                                <th onClick={() => handleSort('buydate')}>Købsdato</th>
                                <th onClick={() => handleSort('substart')}>Abonnementsstart</th>
                                <th onClick={() => handleSort('subend')}>Abonnementsafslutning</th>
                                <th onClick={() => handleSort('kmstart')}>Start kilometer</th>
                                <th onClick={() => handleSort('kmdone')}>Kørte kilometer</th>
                                <th onClick={() => handleSort('kmplanned')}>Planlagte kilometer</th>
                                <th onClick={() => handleSort('subtime')}>Abonnementstid</th>
                                <th onClick={() => handleSort('customer.id')}>Kunde-ID</th>
                                <th onClick={() => handleSort('car.id')}>Bil-ID</th>
                                <th>Handlinger</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedSubscriptions.map(subscription => (
                            <tr key={subscription.id}>
                                <td> {subscription.id}</td>
                                <td>{subscription.buydate}</td>
                                <td>{subscription.substart}</td>
                                <td>{subscription.subend}</td>
                                <td>{subscription.kmstart}</td>
                                <td>{subscription.kmdone}</td>
                                <td>{subscription.kmplanned}</td>
                                <td>{subscription.subtime} months</td>
                                <td>{subscription.customer ? subscription.customer.id : 'N/A'}</td>
                                <td>{subscription.car ? subscription.car.id : 'N/A'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditClick(subscription)}>Rediger</button>
                                    <button className="delete-btn" onClick={() => handleDelete(subscription.id)}>Slet</button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionList;
