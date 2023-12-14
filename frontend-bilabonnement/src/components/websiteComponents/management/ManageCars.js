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
        img:'',
        carFree: true
    });
    const [carId, setCarId] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCar(prev => ({ ...prev, [name]: value }));
    };
    const handleCheckboxChange = (e) => {
        setNewCar(prev => ({ ...prev, isCarFree: e.target.checked }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data being sent:", JSON.stringify(newCar));

        axios.post('https://bilabonnementapi.azurewebsites.net/cars', JSON.stringify(newCar), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('Bil oprettet succesfuldt!');
            })
            .catch(error => {
                console.error('Error creating car', error);
                alert('Fejl i oprettelse af bil');
            });

        setNewCar({ brand: '', model: '', price: '', fueltype: '', regNr: '', nummerplade:'', img:'', carFree: true });
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
                <input type="text" name="img" value={newCar.img} onChange={handleChange} placeholder="Billede-URL" />
                <input
                    type="checkbox"
                    name="carFree"
                    checked={newCar.carFree}
                    onChange={handleCheckboxChange}
                />

                <button className="Button-update" type="submit">{carId ? 'Update Car' : 'Opret Car'}</button>
            </form>


        </div>
    );
}

export default ManageCars;
