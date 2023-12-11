import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../websiteComponents/navbar";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('https://bilabonnementapi.azurewebsites.net/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    }, []);

    return (
        <div>
            <header className="App-header">
                <Navbar />
            </header>
        <div>
            {customers.map(customer => (
                <div className="container" key={customer.id}>
                    <h2>{`${customer.firstName} ${customer.lastName}`}</h2>
                    <p>Address: {customer.address}</p>
                    <p>Zip Code: {customer.zipcode}</p>
                    <p>City: {customer.city}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Email: {customer.email}</p>
                    <p>CPR: {customer.cpr}</p>
                </div>
            ))}
        </div>
        </div>
    );
}

export default CustomerList;
