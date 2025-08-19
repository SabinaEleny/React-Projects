import {type ReactNode} from 'react';

type ButtonProps = {
    children : ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'delete' | 'edit';
    type?: 'button' | 'submit';
    className?: string;
}

export function Button({children, onClick, variant = 'primary', type = 'button', className}: ButtonProps) {

    const baseClass = "font-bold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95";

    const variantClasses = {
        primary: 'bg-slate-800 hover:bg-slate-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-black',
        delete: 'font-semibold bg-[#ed4344] hover:bg-red-700 text-white',
        edit: 'font-semibold bg-[#10b881] hover:bg-green-700 text-white',
};

    return (
        <button
        type={type}
        onClick={onClick}
        className={`${baseClass} ${variantClasses[variant]} ${className}`}
        >
            {children}
        </button>
    );

}