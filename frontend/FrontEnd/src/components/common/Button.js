import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    icon = null
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon && <i className={`icon ${icon}`}></i>}
            {children}
        </button>
    );
};

export default Button;
