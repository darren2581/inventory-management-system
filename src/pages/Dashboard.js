import { React, useState } from 'react';
import '../App.css';
import '../styles/Sidebar.css';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // Mock data for low/out-of-stock items
  const lowStockItems = [
    { id: 1, name: 'Product A', stock: 3, status: 'Low Stock' },
    { id: 2, name: 'Product B', stock: 0, status: 'Out of Stock' },
    { id: 3, name: 'Product C', stock: 1, status: 'Low Stock' },
    { id: 4, name: 'Product D', stock: 0, status: 'Out of Stock' },
  ];

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
          <li>
            <Link to="/profile">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard">
        <div className="container-dashboard">
          <h2>Dashboard Overview</h2>
          <p>
            Welcome to the Dashboard! Here, you can find a summary of all critical data points, giving you insights into the overall performance and status of your management system.
          </p>

          {/* Dashboard Stats */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>1,250</p>
            </div>
            <div className="stat-card">
              <h3>Low Stock</h3>
              <p>45</p>
            </div>
            <div className="stat-card">
              <h3>Out of Stock</h3>
              <p>10</p>
            </div>
            <div className="stat-card">
              <h3>Username</h3>
              <p>darren2581</p>
            </div>
          </div>

          {/* Restock list section */}
          <div className="restock-alert">
            <h3>Restock Items</h3>
            <table className="list-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td className={item.status === 'Out of Stock' ? 'out-stock' : 'low-stock'}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
