import { type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'delete' | 'edit';
  type?: 'button' | 'submit';
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className,
}: ButtonProps) {
  const baseClass =
    'font-bold py-2 px-4 rounded-lg transition-all duration-200 active:scale-95';

  const variantClasses = {
    primary: 'bg-slate-800 hover:bg-slate-700 text-white',
    secondary:
      'bg-white-200 hover:bg-gray-100 text-black border border-slate-300 rounded-md py-2 px-3',
    delete: 'font-semibold bg-faded-red hover:bg-red-700 text-white',
    edit: 'font-semibold bg-faded-green hover:bg-green-700 text-white',
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
