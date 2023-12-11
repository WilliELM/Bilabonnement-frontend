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
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
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
        axios.post('https://bilabonnementapi.azurewebsites.net/customers', newCustomer)
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
        axios.delete(`https://bilabonnementapi.azurewebsites.net/customers/${customerId}`)
            .then(response => {
                fetchCustomers(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting customer', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={newCustomer.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={newCustomer.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="address" value={newCustomer.address} onChange={handleChange} placeholder="Address" />
                <input type="text" name="zipcode" value={newCustomer.zipcode} onChange={handleChange} placeholder="Zip code" />
                <input type="text" name="city" value={newCustomer.city} onChange={handleChange} placeholder="City" />
                <input type="text" name="phone" value={newCustomer.phone} onChange={handleChange} placeholder="Phone number" />
                <input type="text" name="email" value={newCustomer.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="cpr" value={newCustomer.cpr} onChange={handleChange} placeholder="Cpr-number" />

                {/* Add input/select for subscriptions if needed */}
                <button type="submit">Create Customer</button>
            </form>

        </div>
    );
}

export default ManageCustomers;
