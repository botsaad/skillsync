import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css';
import { FaChartLine, FaRobot, FaUserGraduate } from 'react-icons/fa';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }
      const userId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserName(userDoc.data().name || 'User');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">Skills Sync</div>
          <button onClick={() => navigate('/profile')} className="nav-tab">Profile Management</button>
          <button onClick={() => navigate('/help')} className="nav-tab">Help</button>
        </div>
        <div className="header-right">
          <span>Hello, {userName}</span>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to Skills Sync!</h1>
          <p>Unlock insights tailored to your career growth with our AI-driven tools.</p>
          <div className="icon-section">
            <div className="icon-box">
              <FaChartLine className="dashboard-icon" />
              <p>Career Growth</p>
            </div>
            <div className="icon-box">
              <FaRobot className="dashboard-icon" />
              <p>AI Insights</p>
            </div>
            <div className="icon-box">
              <FaUserGraduate className="dashboard-icon" />
              <p>Skill Enhancement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
