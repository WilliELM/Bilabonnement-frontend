import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditCustomerModal from "./editCustomer"; // Ensure this path is correct
import "./customerList.css";
import Navbar from "../../websiteComponents/navBar/navbar"; // Create a new CSS file for customerList

function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers', error);
            });
    }, []);

    const handleDelete = (customerId) => {
        axios.delete(`https://bilabonnementapi.azurewebsites.net/customers/${customerId}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== customerId));
            })
            .catch(error => {
                console.error('Error deleting customer', error);
            });
    };

    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
    };

    const handleUpdate = (updatedCustomer) => {
        axios.put(`https://bilabonnementapi.azurewebsites.net/customers/${updatedCustomer.id}`, updatedCustomer)
            .then(() => {
                setCustomers(customers.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer)));
                setEditingCustomer(null);
            })
            .catch(error => {
                console.error('Error updating customer', error);
            });
    };

    return (
        <div className="App">
            <header className="Dashboard">
                <Navbar />
            </header>
            <h2> Kunde tabel </h2>
            <div className="page-container">
                {editingCustomer && (
                    <EditCustomerModal
                        customer={editingCustomer}
                        onClose={() => setEditingCustomer(null)}
                        onSave={handleUpdate}
                    />
                )}


                <div className="table-air">
                    <table>
                        <thead>
                            <tr>
                                <th>Kunde id</th>
                                <th>Fornavn</th>
                                <th>Efternavn</th>
                                <th>Adresse</th>
                                <th>Post nummer</th>
                                <th>By</th>
                                <th>Telefon nummer</th>
                                <th>E-mail</th>
                                <th>CPR</th>
                                <th>Handlinger</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.zipcode}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.cpr}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEditClick(customer)}>Rediger</button>
                                        <button className="delete-btn" onClick={() => handleDelete(customer.id)}>Slet</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomerTable;
