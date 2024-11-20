import { React, useState } from 'react';
import '../styles/Sidebar.css';
import '../styles/Activity.css';
import { Link } from 'react-router-dom';

const Activity = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState('');
  const [inventory, setInventory] = useState([
    { id: '001', name: 'Product A', quantity: 10 },
    { id: '002', name: 'Product B', quantity: 19 },
    { id: '003', name: 'Product C', quantity: 100 }
  ]);

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
          <li className="active">
            <Link to="/activity">
              <span className="material-symbols-outlined">schedule</span>
              <span>Activity</span>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <span className="material-symbols-outlined">description</span>
              <span>Reports</span>
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
      <div className="activity">
        <div className="container-activity">
          <h2>Activities</h2>
          <p>
            Welcome to the Activity section! Here, you can manage the inventory by adding or removing items.
            This section allows you to keep track of your product inventory, ensuring that everything stays up-to-date and well-managed.
            You can view your current inventory and perform actions such as taking stock out when needed.
          </p>
          <div className="inventory-management">
            <h3>Inventory Management</h3>

            {/* Input Section */}
            <div className="item-actions">
              <label htmlFor="item-name">Item Name:</label>
              <input
                type="text"
                id="item-name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
              />
              <label htmlFor="item-id">Unique ID:</label>
              <input
                type="text"
                id="item-id"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter unique ID"
              />
              <button>Take Item</button>
            </div>

            {/* Inventory List */}
            <div className="inventory-list">
              <h3>Inventory Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Unique ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length > 0 ? (
                    inventory.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity || 'N/A'}</td>
                        <td>{item.quantity && item.quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No inventory items available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
