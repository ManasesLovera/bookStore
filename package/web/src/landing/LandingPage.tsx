import React from 'react';
import HomePage from '../pages/HomePage';
import Cards from '../pages/Cards';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <HomePage />
      <Cards />
    </div>
  );
};

export default LandingPage;

