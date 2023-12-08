import React, { useEffect, useState } from 'react';

const EditSubscriptionModal = ({ subscription, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...subscription,
        customerId: subscription.customer ? subscription.customer.id : '',
        carId: subscription.car ? subscription.car.id : '',
    });

    useEffect(() => {
        setFormData({
            ...subscription,
            customerId: subscription.customer ? subscription.customer.id : '',
            carId: subscription.car ? subscription.car.id : '',
        });
    }, [subscription]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            ...formData,
            customer: { id: formData.customerId },
            car: { id: formData.carId },
        };
        onSave(dataToSend);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Buy Date:</label>
                        <input
                            type="string"
                            name="buydate"
                            value={formData.buydate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Subscription Start:</label>
                        <input
                            type="string"
                            name="substart"
                            value={formData.substart}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Subscription End:</label>
                        <input
                            type="string"
                            name="subend"
                            value={formData.subend}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Kilometers Start:</label>
                        <input
                            type="number"
                            name="kmstart"
                            value={formData.kmstart}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Kilometers Done:</label>
                        <input
                            type="number"
                            name="kmdone"
                            value={formData.kmdone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Kilometers Planned:</label>
                        <input
                            type="number"
                            name="kmplanned"
                            value={formData.kmplanned}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Subscription Time (in months):</label>
                        <input
                            type="number"
                            name="subtime"
                            value={formData.subtime}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Customer ID:</label>
                        <input
                            type="text"
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Car ID:</label>
                        <input
                            type="text"
                            name="carId"
                            value={formData.carId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubscriptionModal;
