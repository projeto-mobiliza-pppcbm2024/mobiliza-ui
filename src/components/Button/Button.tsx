import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
    return (
        <button
            {...props}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none"
        >
            {label}
        </button>
    );
};

export default Button;
