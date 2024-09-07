import React from 'react';
import libreria from '../assets/images/libreria.png';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-wrap h-screen mt-10  bg-gray-100">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8">
                <h1 className="text-4xl font-bold mb-4 text-cyan-700">Discover, learn, grow.</h1>
                <p className="text-lg mb-4">
                BookStore is your ideal destination for finding and purchasing the books you’ve always wanted. Browse through our extensive and diverse collection of titles, ranging from timeless classics to the latest releases.
                </p>
                <button className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-700">
                  Start
                </button>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={libreria}
                    className="custom-xxl h-auto object-cover"
                    alt="Imagen de librería"
                />
            </div>

        </div>
    );
};

export default HomePage;

