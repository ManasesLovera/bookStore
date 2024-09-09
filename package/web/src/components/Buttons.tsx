import React from 'react';

interface Buttons {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  className?: string;
}

const Buttons: React.FC<Buttons> = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-48 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      {text}
    </button>
  );
};

export default Buttons;
