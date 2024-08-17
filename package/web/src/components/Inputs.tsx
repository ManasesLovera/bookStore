import React from 'react';

interface InputProps {
  name: string;
  type: 'text' | 'email' | 'password';
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ name, type, label, required }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        required={required}
      />
    </div>
  );
};

export default Input;
