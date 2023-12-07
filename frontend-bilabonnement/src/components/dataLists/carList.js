import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    }, []);

    return (
        <div>
            {cars.map(car => (
                <div className="container" key={car.id}>
                    {car.data}
                    <h2>{`${car.brand} ${car.model}`}</h2>
                    <p>Price: Dkk {car.price},-</p>
                    <p>Fuel Type: {car.fueltype}</p>
                    <p>Registration Number: {car.regNr}</p>
                    <p>License Plate: {car.nummerplade}</p>
                    <p>Car Free: {car.carFree ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
}

export default CarList;
