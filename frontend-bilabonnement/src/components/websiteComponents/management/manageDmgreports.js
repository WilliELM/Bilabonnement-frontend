import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageDmgReports() {
    const [damageReports, setDamageReports] = useState([]);
    const [newDamageReport, setNewDamageReport] = useState({
        cleaningCost: '',
        repairCost: '',
        subscription: null, // Change to an object
        damageDescription: '',
    });
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null); // Change to an object

    useEffect(() => {
        fetchDamageReports();
        fetchSubscriptions();
    }, []);

    const fetchDamageReports = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/damagereports')
            .then(response => {
                setDamageReports(response.data);
            })
            .catch(error => {
                console.error('Error fetching damage reports', error);
            });
    };

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
        setNewDamageReport({
            ...newDamageReport,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedSubscription !== null) {
            const updatedDamageReport = {
                ...newDamageReport,
                subscription: selectedSubscription,
            };

            console.log('Submitting Damage Report:', updatedDamageReport);

            axios.post('https://bilabonnementapi.azurewebsites.net/damagereports', updatedDamageReport)
                .then(response => {
                    setNewDamageReport({
                        cleaningCost: '',
                        repairCost: '',
                        subscription: null,
                        damageDescription: '',
                    });
                    setSelectedSubscription(null); // Reset selectedSubscription
                    fetchDamageReports();
                })
                .catch(error => {
                    console.error('Error adding new damage report', error);
                });
        } else {
            console.error('No subscription selected');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2> Create new damage report </h2>
                <input type="number" name="cleaningCost" value={newDamageReport.cleaningCost} onChange={handleChange} placeholder="Cleaning Cost" />
                <input type="number" name="repairCost" value={newDamageReport.repairCost} onChange={handleChange} placeholder="Repair Cost" />

                {/* Add the dropdown for selecting subscription */}
                <select
                    name="subscription"
                    value={selectedSubscription ? String(selectedSubscription.id) : ''}
                    onChange={(e) => {
                        const selectedSub = subscriptions.find(sub => sub.id === parseInt(e.target.value, 10));
                            setSelectedSubscription(selectedSub);
                     }}
                >
                     <option value="">Select Subscription</option>
                    {subscriptions.map(subscription => (
                         <option key={subscription.id} value={String(subscription.id)}>
                        {`${subscription.customer.firstName} ${subscription.customer.lastName} - ${subscription.id}`}
                     </option>
                      ))}
                </select>


                <input type="text" name="damageDescription" value={newDamageReport.damageDescription} onChange={handleChange} placeholder="Damage Description" />
                <button className="Button-update" type="submit">Create Damage Report</button>
            </form>
        </div>
    );
}

export default ManageDmgReports;
