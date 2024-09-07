import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAppContext();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <nav className="max-w-[85rem] mx-auto py-4 px-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <FaBook className="text-3xl text-cyan-800" />
          <Link className="text-3xl font-semibold text-gray-800 dark:text-cyan-500" to="/">
            <span className="text-cyan-800">Book</span>Store
          </Link>
          <button
            type="button"
            className="relative flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/20 focus:outline-none focus:bg-gray-700/20 text-sm sm:hidden"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-controls="navbar"
            aria-label="Toggle navigation"
          >
            <svg className={`shrink-0 size-4 ${isOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg className={`shrink-0 size-4 ${isOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
        <div id="navbar" className={`transition-all duration-300 ${isOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:justify-end`}>
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <Link to="/books" className="font-medium text-gray-800 dark:text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-300 ease-in-out">
              Books
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="font-medium text-gray-800 dark:text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="font-medium text-gray-800 dark:text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-300 ease-in-out">
                  Login
                </Link>
                <Link to="/register" className="font-medium text-gray-800 dark:text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition duration-300 ease-in-out">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
