// src/pages/Dashboard.js
import React from 'react';
import { signOut } from '../firebase'; // Import the signOut function
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(); // Call the signOut function
      navigate('/'); // Redirect to the home page after sign-out
    } catch (error) {
      console.error('Error during sign-out: ', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;

