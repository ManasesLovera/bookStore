import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  author: string; 
  price: string; 
  className?: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, author, price, className }) => {
  return (
    <div className={`rounded-lg shadow-none ${className}`}>
      <img
        className="w-full h-[400px] object-contain rounded-t-lg"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="text-gray-700 dark:text-gray-900">{author}</p>
        <p className="font-semibold text-gray-900 dark:text-cyan-700">{price}</p>
      </div>
    </div>
  );
};

export default Card;

