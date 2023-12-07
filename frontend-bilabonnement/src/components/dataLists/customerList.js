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
            {customers.map(customer => (
                <div key={customer.id}>
                    <p>Customer {customer.id} with name {customer.firstName} {customer.lastName}</p>
                </div>
            ))}
        </div>
    );
}

export default CustomerList;
