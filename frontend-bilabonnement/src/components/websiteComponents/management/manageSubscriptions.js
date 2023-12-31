import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newSubscription, setNewSubscription] = useState({
        buydate: '',
        substart: '',
        subend: '',
        kmstart: 0,
        kmdone: 0,
        kmplanned: 0,
        subtime: 0,
        car: null, 
        customer: null,
    });
    const [cars, setCars] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); 
    const [selectedCustomer, setSelectedCustomer] = useState(null); 

    useEffect(() => {
        fetchSubscriptions();
        fetchCars();
        fetchCustomers();
    }, []);

    const fetchSubscriptions = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/subscriptions')
            .then(response => {
                setSubscriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching subscriptions', error);
            });
    };

    const fetchCars = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    };

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
        setNewSubscription({
            ...newSubscription,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCar !== null && selectedCustomer !== null) {
            const updatedSubscription = {
                ...newSubscription,
                car: selectedCar,
                customer: selectedCustomer,
            };

            console.log('Submitting Subscription:', updatedSubscription);

            axios.post('https://bilabonnementapi.azurewebsites.net/subscriptions', updatedSubscription)
                .then(response => {
                    alert('Abonnement oprettet succesfuldt!');
                    setNewSubscription({
                        buydate: '',
                        substart: '',
                        subend: '',
                        kmstart: 0,
                        kmdone: 0,
                        kmplanned: 0,
                        subtime: 0,
                        car: null,
                        customer: null,
                    });
                    setSelectedCar(null); 
                    setSelectedCustomer(null); 
                    fetchSubscriptions();
                })
                .catch(error => {
                    console.error('Error adding new subscription', error);
                    alert('Fejl i oprettelse af abonnement');
                });
        } else {
            console.error('Car or Customer not selected');
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
      
                <h2> Opret nyt abonnement </h2>
                <div className="description">Indtast Købsdato</div>
                <input type="date" name="buydate" value={newSubscription.buydate} onChange={handleChange} placeholder="Købsdato" />
                <div className="description">Indtast abonnements start</div>
                <input type="date" name="substart" value={newSubscription.substart} onChange={handleChange} placeholder="Abonnementsstart" />
                <div className="description">Indtast abonnementsafslutning</div>
                <input type="date" name="subend" value={newSubscription.subend} onChange={handleChange} placeholder="Abonnementsafslutning" />
                <div className="description">Indtast start kilometer</div>
                <input type="number" name="kmstart" value={newSubscription.kmstart} onChange={handleChange} placeholder="Start kilometer" />
                <div className="description">Indtast kørte kilometer</div>
                <input type="number" name="kmdone" value={newSubscription.kmdone} onChange={handleChange} placeholder="Kørte kilometer" />
                <div className="description">Indtast planlagte kilometer</div>
                <input type="number" name="kmplanned" value={newSubscription.kmplanned} onChange={handleChange} placeholder="Planlagte kilometer" />
                <div className="description">Indtast abonnementstid (måneder)</div>
                <input type="number" name="subtime" value={newSubscription.subtime} onChange={handleChange} placeholder="Abonnementstid" />

                <div className="description">Vælg Bil</div>
                <select
                    name="car"
                    onChange={(e) => {
                        const selectedCar = cars.find(car => car.id === parseInt(e.target.value, 10));
                        setSelectedCar(selectedCar);
                    }}
                    value={selectedCar ? String(selectedCar.id) : ''}
                >
                    <option value="" disabled>Vælg Bil</option>
                    {cars.filter(car => car.carFree).map(car => (

                        <option key={car.id} value={String(car.id)}>
                            {`${car.brand} ${car.model} - ID: ${car.id}`}
                        </option>
                    ))}
                    
                </select>

                <div className="description">Vælg kunde</div>

                <select name="customer" onChange={(e) => setSelectedCustomer(customers.find(customer => customer.id === parseInt(e.target.value, 10)))} value={selectedCustomer ? String(selectedCustomer.id) : ''}>
                    <option value="" disabled>Vælg kunde</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={String(customer.id)}>
                            {`${customer.firstName} ${customer.lastName} - ID: ${customer.id}`}
                        </option>
                    ))}
                </select>

                <button className="Button-update" type="submit"> Opret abonnement </button>

            </form>
        </div>
    );
}

export default ManageSubscriptions;
