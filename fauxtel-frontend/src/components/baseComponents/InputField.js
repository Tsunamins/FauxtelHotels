import React, { useState } from 'react';
import '../../styles/Forms.css';

export const InputField = ({ className, name, placeholder, value, onClick, type}) => {
    const [fieldValue, setFieldValue] = useState(value || undefined);

    return (
        <input 
            className={className}
            name={name}
            onChange={(e) => setFieldValue(e.target.value)} 
            onClick={onClick}
            placeholder={placeholder}
            type={type} 
            value={fieldValue}/>
    );
};