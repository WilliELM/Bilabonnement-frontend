import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactComponent as CogwheelIcon } from './cogwheel-icon.svg'; // Import a cogwheel icon

import './carList.css';

function CarList() {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        maxPrice: Infinity,
        availability: true
    });
    const [showDropdown, setShowDropdown] = useState({}); // State to manage dropdown visibility

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        axios.get('http://localhost:8080/cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars', error);
            });
    };
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (carId) => {
        setActiveDropdown(activeDropdown === carId ? null : carId);
    };

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

    const deleteCar = (carId) => {
        axios.delete(`http://localhost:8080/cars/${carId}`)
            .then(response => {
                fetchCars(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting car', error);
            });
    };

    const updateCar = (car) => {
        // You would implement the update functionality here
        // This might involve setting a state variable with the car's current data
        // and showing a form where the user can edit the car's details
        console.log(`Update car: ${JSON.stringify(car)}`);
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
        <div className="page-container">
            <div className="filters-container">
                {/* Filters and inputs */}
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
                        {/* Car details */}
                        <h2>{`${car.brand} ${car.model}`}</h2>
                        <p>Pris: Dkk {car.price},-</p>
                        <p>Brændstof: {car.fueltype}</p>
                        <p>Registreringsnummer: {car.regNr}</p>
                        <p>Nummerplade: {car.nummerplade}</p>
                        <p>Car ID: {car.id}</p>
                        {/* Cogwheel Icon to toggle dropdown */}
                        <button className="cogwheel-button" onClick={() => toggleDropdown(car.id)}>
                            <CogwheelIcon className="cogwheel-icon" />
                        </button>

                        {/* Dropdown menu for update and delete */}
                        {activeDropdown === car.id && (
                            <div className="dropdown-menu">
                                <button onClick={() => updateCar(car)}>Update</button>
                                <button onClick={() => deleteCar(car.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarList;