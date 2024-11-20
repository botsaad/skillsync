import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaUser, FaChartLine, FaRobot } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="logo">Skills Sync</div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/signup')} className="nav-btn">Sign Up & Login</button>
          <button onClick={() => navigate('/login')} className="nav-btn">Login</button>
        </div>
      </nav>
      
      <div className="hero-section">
        <h1>Welcome to Skills Sync</h1>
        <p>Unlock your career potential with AI-driven insights tailored to your skills and goals.</p>
        <button className="get-started-btn" onClick={() => navigate('/signup')}>Get Started</button>
      </div>

      <div className="features">
        <div className="feature-card">
          <FaRobot className="feature-icon" />
          <h3>AI Assistance</h3>
          <p>Personalized recommendations powered by AI.</p>
        </div>
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Career Growth</h3>
          <p>Grow your skills and advance your career.</p>
        </div>
        <div className="feature-card">
          <FaUser className="feature-icon" />
          <h3>Career Assistance</h3>
          <p>Get the support you need to succeed.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
