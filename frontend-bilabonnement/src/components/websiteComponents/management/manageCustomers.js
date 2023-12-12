// ManageCustomers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageCustomers() {
    const [customers, setCustomers] = useState([]);
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
                alert('Kunde oprettet succesfuldt!');
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
                fetchCustomers();
            })
            .catch(error => {
                console.error('Error adding new customer', error);
                alert('Fejl i oprettelse af kunde');
            });
    };


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2> Opret ny kunde </h2>
                <input type="text" name="firstName" value={newCustomer.firstName} onChange={handleChange} placeholder="Fornavn" />
                <input type="text" name="lastName" value={newCustomer.lastName} onChange={handleChange} placeholder="Efternavn" />
                <input type="text" name="address" value={newCustomer.address} onChange={handleChange} placeholder="Adresse" />
                <input type="text" name="zipcode" value={newCustomer.zipcode} onChange={handleChange} placeholder="Post nummer" />
                <input type="text" name="city" value={newCustomer.city} onChange={handleChange} placeholder="By" />
                <input type="text" name="phone" value={newCustomer.phone} onChange={handleChange} placeholder="Tlf. nummer" />
                <input type="text" name="email" value={newCustomer.email} onChange={handleChange} placeholder="E-mail" />
                <input type="text" name="cpr" value={newCustomer.cpr} onChange={handleChange} placeholder="Cpr-nummer" />

                <button className="Button-update" type="submit">Opret kunde</button>
            </form>

        </div>
    );
}

export default ManageCustomers;
