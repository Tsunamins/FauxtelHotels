import { BaseButtonProps } from './baseComponentProps';

export const BaseButton = ({ displayText, onClick, type}: BaseButtonProps) => {
    return (
        <button onClick={onClick} type={type}>{displayText}</button>
    );
};
