import {React, useState} from 'react'
import '../styles/Sidebar.css'

const Sidebar = () => {
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
            <a href="#">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#/dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <button onClick={toggleSubMenu} className="dropdown-btn">
              <span className="material-symbols-outlined">create_new_folder</span>
              <span className="dropdown">Create</span>
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <ul className="sub-menu">
              <div>
                <li>
                  <a href="#">Folder</a>
                </li>
                <li>
                  <a href="#">Document</a>
                </li>
                <li>
                  <a href="#">Project</a>
                </li>
              </div>
            </ul>
          </li>
          <li>
            <button onClick={toggleSubMenu} className="dropdown-btn">
              <span className="material-symbols-outlined">checklist</span>
              <span className="dropdown">ToDo-List</span>
              <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <ul className="sub-menu">
              <div>
                <li>
                  <a href="#">Work</a>
                </li>
                <li>
                  <a href="#">Private</a>
                </li>
                <li>
                  <a href="#">Coding</a>
                </li>
                <li>
                  <a href="#">Gardening</a>
                </li>
                <li>
                  <a href="#">School</a>
                </li>
              </div>
            </ul>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Calender</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container">
          <h2>React App</h2>
          <p>
            Learning to code can open doors to endless possibilities, from creating innovative
            applications to solving real-world problems. With consistent practice, the once-complicated
            syntax becomes second nature. Start small, experiment, and embrace mistakes—they’re part of
            the journey. Every line of code brings you closer to mastering this powerful skillset.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Sidebar