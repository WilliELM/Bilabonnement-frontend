// ManageCustomers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageCustomers() {
    const [customers, setCustomers] = useState([]); // State to store existing customers
    const [newCustomer, setNewCustomer] = useState({
        firstName: '',
        lastName: '',
        address: '',
        zipcode: '',
        city: '',
        phone: '',
        email: '',
        cpr: '',
    });

    // Fetch existing customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://localhost:8080/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customers', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({
            ...newCustomer,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/customers', newCustomer)
            .then(response => {
                setNewCustomer({
                    firstName: '',
                    lastName: '',
                    address: '',
                    zipcode: '',
                    city: '',
                    phone: '',
                    email: '',
                    cpr: '',
                });
                fetchCustomers(); // Refresh the list after adding
            })
            .catch(error => {
                console.error('Error adding new customer', error);
            });
    };

    const handleDelete = (customerId) => {
        axios.delete(`http://localhost:8080/customers/${customerId}`)
            .then(response => {
                fetchCustomers(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting customer', error);
            });
    };

    return (
        <div>
            <h2>Manage Customers</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                {/* ... */}
                <button type="submit">Add Customer</button>
            </form>

            <h3>Customer List</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        {customer.firstName} {customer.lastName}
                        <button onClick={() => handleDelete(customer.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageCustomers;
