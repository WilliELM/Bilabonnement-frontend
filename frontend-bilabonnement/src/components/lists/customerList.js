import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    }, []);

    return (
        <div>
            <h1> Customers </h1>
            <li className="image-container">
                {customers.map(customer => (
                    <div key={customer.id} className="customer-card">
                        <p className="customers">Customer {customer.id} with name {customer.firstName} {customer.lastName}</p>
                    </div>
                ))}

            </li>

        </div>
    );
}

export default CustomerList;
