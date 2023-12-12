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
    const [carId, setCarId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCar(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (carId) {
            axios.put(`https://bilabonnementapi.azurewebsites.net/cars/${carId}`, newCar)
                .then(response => {
                    alert('Bil opdateret succesfuldt!');
                })
                .catch(error => {
                    console.error('Error updating car', error);
                    alert('Fejl i opdatering af bil');
                });
        } else {
            axios.post('https://bilabonnementapi.azurewebsites.net/cars', newCar)
                .then(response => {
                    alert('Bil oprettet succesfuldt!');
                })
                .catch(error => {
                    console.error('Error creating car', error);
                    alert('Fejl i oprettelse af bil');
                });
        }
        setNewCar({ brand: '', model: '', price: '', fueltype: '', regNr: '', nummerplade:'', isCarFree: true });
        setCarId('');
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2> Opret ny bil </h2>
                <input type="text" name="brand" value={newCar.brand} onChange={handleChange} placeholder="Bilmærke" />
                <input type="text" name="model" value={newCar.model} onChange={handleChange} placeholder="Model" />
                <input type="text" name="price" value={newCar.price} onChange={handleChange} placeholder="Pris" />
                <input type="text" name="fueltype" value={newCar.fueltype} onChange={handleChange} placeholder="Brændstof" />
                <input type="text" name="regNr" value={newCar.regNr} onChange={handleChange} placeholder="Reg Nr" />
                <input type="text" name="nummerplade" value={newCar.nummerplade} onChange={handleChange} placeholder="Nummerplade" />

                <button className="Button-update" type="submit">{carId ? 'Update Car' : 'Opret Car'}</button>
            </form>


        </div>
    );
}

export default ManageCars;
