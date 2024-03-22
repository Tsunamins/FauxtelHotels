import React from 'react';
import '../../styles/Forms.css';

export const AuthButton = ({ className, displayText, onClick, type}) => {
    return (
        <button className='authButtons' type={type}>{displayText}</button>
    );
};