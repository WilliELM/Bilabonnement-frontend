import React from 'react';
import './alarmsComponent.css'; // Make sure to create an Alarm.css file

const Alarm = ({ title, message, isCritical }) => {
    return (
        <div className={`alarm ${isCritical ? 'alarm-critical' : ''}`}>
            <h4>{title}</h4>
            <p>{message}</p>
        </div>
    );
};

export default Alarm;
