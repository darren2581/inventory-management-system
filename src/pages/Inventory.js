import { React, useState } from 'react';
import '../styles/Sidebar.css';
import '../styles/Inventory.css';
import { Link } from 'react-router-dom';

const Inventory = () => {
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
          <li className="active">
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
          <h2>Inventory Management</h2>
          <p>
            The Inventory section allows you to view, manage, and update your product stock levels.
            You can monitor your inventory, track products, and make necessary updates in the system.
          </p>
          
          {/* Example Inventory Table */}
          <section className="inventory-table">
            <h3>Current Inventory</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product A</td>
                  <td>Electronics</td>
                  <td>120</td>
                  <td>In Stock</td>
                  <td>
                    <button className="btn">Edit</button>
                    <button className="btn">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Product B</td>
                  <td>Furniture</td>
                  <td>30</td>
                  <td>Low Stock</td>
                  <td>
                    <button className="btn">Edit</button>
                    <button className="btn">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>Clothing</td>
                  <td>0</td>
                  <td>Out of Stock</td>
                  <td>
                    <button className="btn">Edit</button>
                    <button className="btn">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Example Add New Product */}
          <section className="add-product">
            <h3>Add New Product</h3>
            <form>
              <label>Product Name:</label>
              <input type="text" placeholder="Enter product name" />
              <label>Category:</label>
              <input type="text" placeholder="Enter category" />
              <label>Quantity:</label>
              <input type="number" placeholder="Enter quantity" />
              <label>Status:</label>
              <select>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <button type="submit" className="btn">Add Product</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
