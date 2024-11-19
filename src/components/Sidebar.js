import { React, useState } from 'react';
import '../styles/Sidebar.css';
import Dashboard from '../pages/Dashboard';

const Sidebar = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('#/dashboard'); // Default active item

  const toggleSidebar = () => {
    if (isSidebarCollapsed) {
      setSidebarCollapsed(false);
    } else {
      const allSubmenus = document.querySelectorAll('.sub-menu.show');
      allSubmenus.forEach((submenu) => submenu.classList.remove('show'));

      const allArrows = document.querySelectorAll('.dropdown-btn span.rotate');
      allArrows.forEach((arrow) => arrow.classList.remove('rotate'));

      setSidebarCollapsed(true);
    }
  };

  const toggleSubMenu = (e) => {
    const button = e.currentTarget;

    if (isSidebarCollapsed) {
      setSidebarCollapsed(false);
      setTimeout(() => {
        const submenu = button.nextElementSibling;
        const arrow = button.querySelector('span:last-child');
        if (submenu) {
          submenu.classList.add('show');
          arrow.classList.add('rotate');
        }
      }, 300);
    } else {
      const submenu = button.nextElementSibling;
      const arrow = button.querySelector('span:last-child');
      if (submenu) {
        submenu.classList.toggle('show');
        arrow.classList.toggle('rotate');
      }
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem); // Update the active menu item
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
          <li
            className={activeMenuItem === '#/dashboard' ? 'active' : ''}
            onClick={() => handleMenuItemClick('#/dashboard')}
          >
            <a href="#/dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li
            className={activeMenuItem === '#/reports' ? 'active' : ''}
            onClick={() => handleMenuItemClick('#/reports')}
          >
            <a href='#/dashboard'>
              <span className="material-symbols-outlined">description</span>
              <span>Reports</span>
            </a>
          </li>

          <li
            className={activeMenuItem === '#/inventory' ? 'active' : ''}
            onClick={() => handleMenuItemClick('#/inventory')}
          >
            <a href="#">
              <span className="material-symbols-outlined">inventory</span>
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <button onClick={toggleSubMenu} className="dropdown-btn">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="dropdown">Stocks</span>
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <ul className="sub-menu">
              <div>
                <li
                  className={activeMenuItem === '#/in-stock' ? 'active' : ''}
                  onClick={() => handleMenuItemClick('#/in-stock')}
                >
                  <a href="#">In Stock</a>
                </li>
                <li
                  className={activeMenuItem === '#/low-stock' ? 'active' : ''}
                  onClick={() => handleMenuItemClick('#/low-stock')}
                >
                  <a href="#">Low Stock</a>
                </li>
                <li
                  className={activeMenuItem === '#/out-stock' ? 'active' : ''}
                  onClick={() => handleMenuItemClick('#/out-stock')}
                >
                  <a href="#">Out of Stock</a>
                </li>
              </div>
            </ul>
          </li>
          <li
            className={activeMenuItem === '#/profile' ? 'active' : ''}
            onClick={() => handleMenuItemClick('#/profile')}
          >
            <a href="#">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Sidebar;
