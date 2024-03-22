import React from 'react';


export const ReservationButton = ({ className, displayText, onClick, type}) => {
    return (
        <button className='reservationButtons' onClick={onClick} type={type}>{displayText}</button>
    );
};
