import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase'; // Import the Firebase authentication method you created earlier
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError('Error logging in. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Your Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
