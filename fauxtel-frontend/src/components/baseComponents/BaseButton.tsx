import React, { MouseEventHandler } from 'react';
import { BaseButtonProps } from './baseComponentProps';

export const BaseButton = ({ className, displayText, onClick, type}: BaseButtonProps) => {
    return (
        <button className={className} onClick={onClick} type={type}>{displayText}</button>
    );
};
