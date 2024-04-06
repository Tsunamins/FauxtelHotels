import React from 'react';
import '../../styles/Forms.css';

export const AuthButton = ({ className, displayText, onClick, type}) => {
    return (
        <button className='authButtons'  onClick={onClick} type={type}>{displayText}</button>
    );
};