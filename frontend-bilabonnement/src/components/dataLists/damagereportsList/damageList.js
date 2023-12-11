// DamageReportList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./damageList.css";
import EditDamageReportModal from "./editDamagereportList";
import Navbar from "../../websiteComponents/navBar/navbar";

const DamageReportList = () => {
    const [damageReports, setDamageReports] = useState([]);
    const [editingDamageReport, setEditingDamageReport] = useState(null);

    useEffect(() => {
        axios.get('https://bilabonnementapi.azurewebsites.net/damagereports')
            .then(response => {
                setDamageReports(response.data);
            })
            .catch(error => {
                console.error('Error fetching damage reports', error);
            });
    }, []);

    const handleDelete = (reportId) => {
        axios.delete(`https://bilabonnementapi.azurewebsites.net/damagereports/${reportId}`)
            .then(() => {
                setDamageReports(damageReports.filter(report => report.id !== reportId));
            })
            .catch(error => {
                console.error('Error deleting damage report', error);
            });
    };

    const handleEditClick = (report) => {
        setEditingDamageReport(report);
    };

    const handleUpdate = (updatedReport) => {
        axios.put(`https://bilabonnementapi.azurewebsites.net/subscriptions/${updatedReport.id}`, updatedReport)
            .then(() => {
                setDamageReports(damageReports.map(sub => sub.id === updatedReport.id ? updatedReport : sub));
                setEditingDamageReport(null);
            })
            .catch(error => {
                console.error('Error updating report', error);
            });    };

    return (
        <div className="App">
            <header className="App-header">
                <Navbar />
            </header>
        <div className="page-container">
            {editingDamageReport && (
                <EditDamageReportModal
                    report={editingDamageReport}
                    onClose={() => setEditingDamageReport(null)}
                    onSave={handleUpdate}
                />
            )}
            <table>
                <thead>
                <tr>
                    <th>Cleaning Cost</th>
                    <th>Repair Cost</th>
                    <th>ID</th>
                    <th>Subscription ID</th>
                    <th>Damage Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {damageReports.map(report => (
                    <tr key={report.id}>
                        <td>{report.cleaningCost}</td>
                        <td>{report.repairCost}</td>
                        <td>{report.id}</td>
                        <td>{report.subscription.id}</td>
                        <td>{report.damageDescription}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEditClick(report)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(report.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default DamageReportList;
