import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './carList.css';


function CarList() {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',  // Changed from model to brand
        maxPrice: Infinity,
        availability: true  // Default checked
    });

    useEffect(() => {
        axios.get('http://localhost:8080/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleAvailabilityChange = (event) => {
        setFilters({
            ...filters,
            availability: event.target.checked
        });
    };

    const filteredCars = () => {
        return cars.filter(car => {
            const filterBrand = filters.brand.trim().toLowerCase();
            const filterMaxPrice = parseFloat(filters.maxPrice) || Infinity;
            const matchesBrand = filterBrand === '' || car.brand.toLowerCase().includes(filterBrand);
            const matchesPrice = isNaN(filterMaxPrice) || car.price <= filterMaxPrice;
            const matchesAvailability = !filters.availability || car.carFree;

            return matchesBrand && matchesPrice && matchesAvailability;
        });
    };

    return (
        <div className="carlist-container">
            <div className="filters-container">
                <input
                    name="brand"
                    placeholder="Brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                />
                <input
                    name="maxPrice"
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
                    onChange={handleFilterChange}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={filters.availability}
                            onChange={handleAvailabilityChange}
                            name="availability"
                        />
                    }
                    label="Available Only"
                />
            </div>
            <div className="cars-container">
            {filteredCars().map(car => (
                <div className="car-card" key={car.id}>
                    <h2>{`${car.brand} ${car.model}`}</h2>
                    <p>Pris: Dkk {car.price},-</p>
                    <p>Brændstof: {car.fueltype}</p>
                    <p>Registreringsnummer: {car.regNr}</p>
                    <p>Nummerplade: {car.nummerplade}</p>
                </div>
            ))}
             </div>
        </div>
    );
}

export default CarList;
