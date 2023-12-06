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
                <div key={car.id}>
                    {car.data}
                    <p>{car.model} - {car.brand} - {car.price}</p>
                </div>
            ))}
        </div>
    );
}

export default CarList;
