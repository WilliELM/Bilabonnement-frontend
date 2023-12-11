import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageDmgReports() {
    const [damageReports, setDamageReports] = useState([]);
    const [newDamageReport, setNewDamageReport] = useState({
        cleaningCost: '',
        repairCost: '',
        subscriptionId: '',
        damageDescription: '',
    });

    useEffect(() => {
        fetchDamageReports();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDamageReport({
            ...newDamageReport,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://bilabonnementapi.azurewebsites.net/damagereports', newDamageReport)
            .then(response => {
                setNewDamageReport({
                    cleaningCost: '',
                    repairCost: '',
                    subscriptionId: '',
                    damageDescription: '',
                });
                fetchDamageReports();
            })
            .catch(error => {
                console.error('Error adding new damage report', error);
            });
    };

    const handleDelete = (reportId) => {
        axios.delete(`https://bilabonnementapi.azurewebsites.net/damagereports/${reportId}`)
            .then(response => {
                fetchDamageReports();
            })
            .catch(error => {
                console.error('Error deleting damage report', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" name="cleaningCost" value={newDamageReport.cleaningCost} onChange={handleChange} placeholder="Cleaning Cost" />
                <input type="number" name="repairCost" value={newDamageReport.repairCost} onChange={handleChange} placeholder="Repair Cost" />
                <input type="text" name="subscriptionId" value={newDamageReport.subscriptionId} onChange={handleChange} placeholder="Subscription ID" />
                <input type="text" name="damageDescription" value={newDamageReport.damageDescription} onChange={handleChange} placeholder="Damage Description" />

                <button type="submit">Add Damage Report</button>
            </form>
        </div>
    );
}

export default ManageDmgReports;
