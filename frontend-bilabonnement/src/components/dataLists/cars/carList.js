import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactComponent as CogwheelIcon } from './cogwheel-icon.svg'; // Import a cogwheel icon

import './carList.css';
import Navbar from "../../websiteComponents/navbar";

function CarList() {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        nummerplade:'',
        availability: true
    });
    const [editingCar, setEditingCar] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState({}); // State to manage dropdown visibility

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        axios.get('https://bilabonnementapi.azurewebsites.net/cars')
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
            availability: event.target.unchecked
        });
    };



    const openPopup = (car) => {
        setEditingCar(car);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setEditingCar(null);
        setPopupOpen(false);
    };

    const handleEditChange = (e) => {
        setEditingCar({
            ...editingCar,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateCar = () => {
        // Implement the update functionality here
        axios.put(`https://bilabonnementapi.azurewebsites.net/cars/${editingCar.id}`, editingCar)
            .then(response => {
                closePopup(); // Close the popup after successful update
                fetchCars(); // Refresh the list after update
            })
            .catch(error => {
                console.error('Error updating car', error);
            });
    };
    const deleteCar = async (carId) => {
        try {
            await axios.delete(`https://bilabonnementapi.azurewebsites.net/cars/${carId}`);
            closePopup(); // Close the popup after successful deletion
            fetchCars(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting car', error);
        }
    };

    const filteredCars = () => {
        return cars.filter(car => {
            const filterBrand = filters.brand.trim().toLowerCase();
            const filterNummerplade = filters.nummerplade.trim().toLowerCase();
            const matchesNummerplade = filterNummerplade === '' || car.nummerplade.toLowerCase().includes(filterNummerplade);

            const filterMaxPrice = parseFloat(filters.maxPrice) || Infinity;
            const matchesBrand = filterBrand === '' || car.brand.toLowerCase().includes(filterBrand);
            const matchesPrice = isNaN(filterMaxPrice) || car.price <= filterMaxPrice;
            const matchesAvailability = !filters.availability || car.carFree;

            return matchesBrand && matchesPrice && matchesAvailability && matchesNummerplade;
        });
    };
    return (
        <div>
            <header className="App-header">
                <Navbar />
            </header>

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
                    name="nummerplade"
                    placeholder="Nummerplade"
                    value={filters.nummerplade}
                    onChange={handleFilterChange}
                />
                <FormControlLabel
                    control={
                        <Switch
                            unchecked={filters.availability}
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
                        <img src={car.img} alt={`${car.brand} ${car.model}`} className="car-image" />
                        <h2>{`${car.brand} ${car.model}`}</h2>
                        <p>Pris: Dkk {car.price},-</p>
                        <p>Brændstof: {car.fueltype}</p>
                        <p>Registreringsnummer: {car.regNr}</p>
                        <p>Nummerplade: {car.nummerplade}</p>
                        <p>Car ID: {car.id}</p>

                        {/* Cogwheel Icon to toggle dropdown */}
                        <button className="cogwheel-button" onClick={() => openPopup(car)}>

                            <CogwheelIcon className="cogwheel-icon" />
                        </button>

                        {activeDropdown === car.id && (
                            <div className="dropdown-menu">
                                <button onClick={() => openPopup(car)}>Update</button>
                                <button onClick={() => deleteCar(car.id)}>Delete</button>
                            </div>
                            )}
                            {/* Overlay */}
                            <div className={`overlay ${isPopupOpen ? 'active' : ''}`} onClick={closePopup}>
                            </div>
                            {/* Popup for editing car */}
                             {isPopupOpen && (
                                      <div className={`popup ${isPopupOpen ? 'active' : ''}`}>
                                        <button className="close-icon" onClick={closePopup}>
                                         &times;{/* "X" character for close icon */}
                                         </button>
                                    <h2>Edit Car</h2>
                                    <label>
                                        Model:
                                        <input
                                            type="text"
                                            name="model"
                                            value={editingCar.model}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <label>
                                        Price:
                                        <input
                                            type="number"
                                            name="price"
                                            value={editingCar.price}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <label>
                                        Fuel Type:
                                        <input
                                            type="text"
                                            name="fueltype"
                                            value={editingCar.fueltype}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <label>
                                        Registration Number:
                                        <input
                                            type="text"
                                            name="regNr"
                                            value={editingCar.regNr}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <label>
                                        Number Plate:
                                        <input
                                            type="text"
                                            name="nummerplade"
                                            value={editingCar.nummerplade}
                                            onChange={handleEditChange}
                                        />
                                    </label>
                                    <div className="button-container">
                                        <button className="update-button" onClick={handleUpdateCar}>
                                            Update
                                        </button>
                                        <button className="delete-button" onClick={() => deleteCar(car.id)}>Delete</button>

                                    </div>
                                </div>
                                )}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default CarList;