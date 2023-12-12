import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageDmgReports() {
    const [damageReports, setDamageReports] = useState([]);
    const [newDamageReport, setNewDamageReport] = useState({
        cleaningCost: '',
        repairCost: '',
        subscription: null,
        damageDescription: '',
    });
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

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
                    alert('Skades rapport oprettet succesfuldt!');
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
                    alert('Fejl i oprettelse af skades rapport');
                });
        } else {
            console.error('No subscription selected');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2> Opret ny skades rapport </h2>
                <input type="number" name="cleaningCost" value={newDamageReport.cleaningCost} onChange={handleChange} placeholder="Rengøringsomkostninger" />
                <input type="number" name="repairCost" value={newDamageReport.repairCost} onChange={handleChange} placeholder="	Reparationsomkostninger" />

                <select
                    name="subscription"
                    value={selectedSubscription ? String(selectedSubscription.id) : ''}
                    onChange={(e) => {
                        const selectedSub = subscriptions.find(sub => sub.id === parseInt(e.target.value, 10));
                            setSelectedSubscription(selectedSub);
                     }}>

                     <option value="">Vælg kunde </option>
                    {subscriptions.map(subscription => (
                         <option key={subscription.id} value={String(subscription.id)}>
                        {`${subscription.customer.firstName} ${subscription.customer.lastName} - ${subscription.id}`}
                     </option>
                      ))}
                </select>
                <input type="text" name="damageDescription" value={newDamageReport.damageDescription} onChange={handleChange} placeholder="Skade beskrivelse" />
                <button className="Button-update" type="submit">Opret ny skades rapport</button>
            </form>
        </div>
    );
}

export default ManageDmgReports;
