import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Car Catalogue</h1>
      <p>Your go-to platform for exploring car brands, models, and more!</p>
      <button onClick={goToLogin}>Login to Start</button>
    </div>
  );
};

export default HomePage;
