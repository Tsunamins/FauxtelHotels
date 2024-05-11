import React, { MouseEventHandler } from 'react';
import '../../styles/Forms.css';

interface AuthButtonProps {
    displayText: string;
    type: 'submit' | 'reset' | 'button' | undefined;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

// todo could really combine buttons and use classname
export const AuthButton = ({ className, displayText, onClick, type}: AuthButtonProps)  => {
    return (
        <button className='authButtons'  onClick={onClick} type={type}>{displayText}</button>
    );
};