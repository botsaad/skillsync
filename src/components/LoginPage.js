import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('User Logged In:', credentials);
    alert('Login successful!');
    // Reset form fields
    setCredentials({ email: '', password: '' });
  };

  return (
    <div className="login-page">
      {/* Left Side Content */}
      <div className="left-panel">
        <h1>Welcome to Skills Sync! 👋</h1>
        <p>
          Unlock your career potential with AI-driven insights. Get personalized
          career recommendations, learning resources, and job matches tailored to your skills.
        </p>
        <footer>© 2024 Skills Sync. All rights reserved.</footer>
      </div>

      {/* Right Side Content */}
      <div className="right-panel">
        <h2>Login to Your Account</h2>
        <p>
          Don't have an account? <Link to="/signup">Create a new account now</Link>
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">Login Now</button>
          <button type="button" className="google-btn">Login with Google</button>
        </form>
        <div className="extra-links">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
