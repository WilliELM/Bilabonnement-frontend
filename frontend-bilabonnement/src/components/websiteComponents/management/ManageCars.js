import React, { useState } from 'react';
import axios from 'axios';

function ManageCars() {
    const [newCar, setNewCar] = useState({
        brand: '',
        model: '',
        price: '',
        fueltype: '',
        regNr: '',
        nummerplade: '',
        isCarFree: true
    });
    const [carId, setCarId] = useState(''); // ID for updating or deleting a car

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCar(prev => ({ ...prev, [name]: value }));
    };

    const handleCarIdChange = (e) => {
        setCarId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (carId) {
            // Update the car
            axios.put(`https://bilabonnementapi.azurewebsites.net/cars/${carId}`, newCar)
                .then(response => {
                    alert('Car updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating car', error);
                    alert('Error updating car');
                });
        } else {
            // Create a new car
            axios.post('https://bilabonnementapi.azurewebsites.net/cars', newCar)
                .then(response => {
                    alert('Car created successfully!');
                })
                .catch(error => {
                    console.error('Error creating car', error);
                    alert('Error creating car');
                });
        }
        setNewCar({ brand: '', model: '', price: '', fueltype: '', regNr: '', nummerplade:'', isCarFree: true });
        setCarId('');
    };

    const handleDelete = () => {
        if (carId) {
            axios.delete(`https://bilabonnementapi.azurewebsites.net/cars/${carId}`)
                .then(response => {
                    alert('Car deleted successfully!');
                })
                .catch(error => {
                    console.error('Error deleting car', error);
                    alert('Error deleting car');
                });
            setCarId('');
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2> Create new Cars </h2>
                <input type="text" name="brand" value={newCar.brand} onChange={handleChange} placeholder="Brand" />
                <input type="text" name="model" value={newCar.model} onChange={handleChange} placeholder="Model" />
                <input type="text" name="price" value={newCar.price} onChange={handleChange} placeholder="Price" />
                <input type="text" name="fueltype" value={newCar.fueltype} onChange={handleChange} placeholder="Fuel Type" />
                <input type="text" name="regNr" value={newCar.regNr} onChange={handleChange} placeholder="Reg Nr" />
                <input type="text" name="nummerplade" value={newCar.nummerplade} onChange={handleChange} placeholder="Nummerplade" />

                {/* Add input/select for subscriptions if needed */}
                <button type="submit">{carId ? 'Update Car' : 'Create Car'}</button>
            </form>


        </div>
    );
}

export default ManageCars;
