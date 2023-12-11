// EditDamageReportModal.js

import React, { useEffect, useState } from 'react';

const EditDamageReportModal = ({ report, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...report });

    useEffect(() => {
        setFormData({ ...report });
    }, [report]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Cleaning Cost:</label>
                        <input
                            type="number"
                            name="cleaning_cost"
                            value={formData.cleaning_cost}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Repair Cost:</label>
                        <input
                            type="number"
                            name="repair_cost"
                            value={formData.repair_cost}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Damage Description:</label>
                        <input
                            type="text"
                            name="damage_description"
                            value={formData.damage_description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Subscription ID:</label>
                        <input
                            type="text"
                            name="subscription_id"
                            value={formData.subscription_id}
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

export default EditDamageReportModal;
