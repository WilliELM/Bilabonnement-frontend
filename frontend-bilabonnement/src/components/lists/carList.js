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
            <h1> Cars </h1>
            <li className="image-container">
                {cars.map(car => (
                    <div key={car.id} className="car-card">
                        {car.data}
                        <p className="cars">{car.brand}: {car.model} - {car.price},- fueltype: {car.fueltype} - {car.nummerplade} </p>
                    </div>
                ))}
            </li>

        </div>
    );
}

export default CarList;