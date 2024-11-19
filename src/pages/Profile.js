import { React, useState } from 'react';
import '../styles/Sidebar.css';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSidebar = () => {
    if (isSidebarCollapsed) {
      // If the sidebar is collapsed, open it without additional actions
      setSidebarCollapsed(false);
    } else {
      // If the sidebar is open, close it and also close any open submenus
      const allSubmenus = document.querySelectorAll('.sub-menu.show');
      allSubmenus.forEach((submenu) => submenu.classList.remove('show')); // Close all submenus
    
      const allArrows = document.querySelectorAll('.dropdown-btn span.rotate');
      allArrows.forEach((arrow) => arrow.classList.remove('rotate')); // Reset all arrows
    
      setSidebarCollapsed(true); // Collapse the sidebar
    }
  };

  const toggleSubMenu = (e) => {
    const button = e.currentTarget;
    
    // Open the sidebar if it's collapsed
    if (isSidebarCollapsed) {
      setSidebarCollapsed(false);
    
      // Use a timeout to ensure the submenu logic executes after the sidebar animation
      setTimeout(() => {
        const submenu = button.nextElementSibling;
        const arrow = button.querySelector('span:last-child');
        if (submenu) {
          submenu.classList.add('show'); // Open the submenu
          arrow.classList.add('rotate'); // Rotate the arrow
        }
      }, 300); // Match the sidebar's transition duration
    } else {
      // Handle normal submenu toggle behavior
      const submenu = button.nextElementSibling;
      const arrow = button.querySelector('span:last-child');
      if (submenu) {
        submenu.classList.toggle('show'); // Toggle submenu visibility
        arrow.classList.toggle('rotate'); // Toggle arrow rotation
      }
    }
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
            <Link to="/reports">
              <span className="material-symbols-outlined">description</span>
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span className="material-symbols-outlined">inventory</span>
              <span>Inventory</span>
            </Link>
          </li>
          <li>
            <Link to="/stocks">
              <span className="material-symbols-outlined">inventory_2</span>
              <span>Stocks</span>
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
      <main>
        <div className="container">
          <h2>Profile</h2>
          <p>
            Welcome to your profile page. Here you can update your personal information, manage your settings, and view your activity.
            Take control of your account and make sure everything is up to date!
          </p>
          <section className="profile-info">
            <h3>Personal Information</h3>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Role: Admin</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Profile;
