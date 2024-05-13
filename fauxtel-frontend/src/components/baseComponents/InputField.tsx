import { useState } from 'react';
import '../../styles/Forms.css';
import { InputFieldProps } from './baseComponentProps';



export const InputField = ({ className, name, placeholder, value, type}: InputFieldProps) => {
    const [fieldValue, setFieldValue] = useState(value || undefined);

    return (
        <input 
            className={className}
            name={name}
            onChange={(e) => setFieldValue(e.target.value)} 
            placeholder={placeholder}
            type={type} 
            value={fieldValue}/>
    );
};