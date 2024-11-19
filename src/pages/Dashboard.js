import { React, useState } from 'react';
import '../App.css';
import '../styles/Sidebar.css';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
          <li className="active">
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
          <li>
            <Link to="/profile">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container">
          <h2>Dashboard Overview</h2>
          <p>
            Welcome to the Dashboard! Here, you can find a summary of all critical data points, giving you insights into the overall performance and status of your management system.
          </p>

          {/* Example Dashboard Stats */}
          <section className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>1,250</p>
            </div>
            <div className="stat-card">
              <h3>Low Stock</h3>
              <p>45</p>
            </div>
            <div className="stat-card">
              <h3>Reports Generated</h3>
              <p>328</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>87</p>
            </div>
          </section>

          {/* Example Graph Section */}
          <section className="dashboard-graphs">
            <h3>Recent Trends</h3>
            <div className="graph-placeholder">
              {/* Replace this with an actual charting library */}
              <p>[Graph Placeholder]</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
