import { React, useState } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';

const Reports = () => {
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
          <li className="active">
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
          <h2>Reports</h2>
          <p>
            The Reports section allows you to view various reports about your system's activity.
            You can generate, view, and export reports for inventory, stocks, sales, and more.
            Keep track of your business's performance through detailed and insightful reports.
          </p>
          
          {/* Example report section */}
          <section className="report-section">
            <h3>Monthly Sales Report</h3>
            <p>This report provides an overview of the sales activities for the month. It includes total sales, product performance, and more.</p>
            <button className="btn">Generate Report</button>
          </section>
          
          <section className="report-section">
            <h3>Inventory Status Report</h3>
            <p>This report shows the current status of your inventory, highlighting items in stock, low stock, and out of stock.</p>
            <button className="btn">Generate Report</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Reports;
