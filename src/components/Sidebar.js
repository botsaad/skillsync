import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Personal Info</li>
        <li>Security</li>
        <li>Notifications</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
