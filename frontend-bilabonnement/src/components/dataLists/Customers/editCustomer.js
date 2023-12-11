import React, { useEffect, useState } from 'react';

const EditCustomerModal = ({ customer, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...customer,
    });

    useEffect(() => {
        setFormData({
            ...customer,
        });
    }, [customer]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Zip Code:</label>
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>CPR:</label>
                        <input
                            type="text"
                            name="cpr"
                            value={formData.cpr}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerModal;
