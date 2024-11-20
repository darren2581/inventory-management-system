import { React, useState } from 'react';
import '../styles/Sidebar.css';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`App ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <nav id="sidebar">
        <ul>
          <li className="first-child">
            <span className="logo">Management</span>
            <button onClick={toggleSidebar} id="toggle-btn">
              <span className="material-symbols-outlined">
                {isSidebarCollapsed
                  ? 'keyboard_double_arrow_right'
                  : 'keyboard_double_arrow_left'}
              </span>
            </button>
          </li>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span className="material-symbols-outlined">inventory</span>
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link to="/activity">
              <span className="material-symbols-outlined">schedule</span>
              <span>Activity</span>
            </Link>
          </li>
          <li className="active">
            <Link to="/profile">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className='profile'>
        <div className="container-profile">
          <h2>Profile</h2>
          <p>
            Welcome to your profile page. Here you can update your personal information, manage your settings, and view your activity.
            Take control of your account and make sure everything is up to date!
          </p>
          <div className="profile-info">
            <h3>Personal Information</h3>
            <p>Name: Darren Tan</p>
            <p>Username: darren2581</p>
            <p>Email: darrentanthongen@gmail.com</p>
            <p>Phone: 012-3456789</p>
            <p>Gender: Male</p>
            <p>Address: 123, Jalan ABC, 12345, Kuala Lumpur</p>
          </div>
          <button className="logout-btn" onClick={() => alert('Logging out...')}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
