import { React, useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../Firebase'; // Ensure you have Firebase initialized
import '../App.css';
import '../styles/Sidebar.css';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [username, setUsername] = useState('');

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    // Fetch inventory data from Firestore
    const fetchInventory = () => {
      const productsRef = collection(db, "products");
      onSnapshot(productsRef, (snapshot) => {
        const fetchedInventory = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInventory(fetchedInventory);

        // Calculate stock statistics
        const total = fetchedInventory.length;
        const lowStock = fetchedInventory.filter(item => item.quantity > 0 && item.quantity <= 5).length;
        const outOfStock = fetchedInventory.filter(item => item.quantity === 0).length;

        setTotalProducts(total);
        setLowStockCount(lowStock);
        setOutOfStockCount(outOfStock);
      });
    };

    // Fetch user's profile data
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username || 'Guest'); // Set the username
          } else {
            console.log('No profile found for the user');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchInventory();
    fetchUserProfile(); // Call function to fetch user profile
  }, []);

  // Filter items with low stock and out of stock
  const lowStockItems = inventory.filter(
    item => item.quantity > 0 && item.quantity <= 5 // Consider items with quantity between 1 and 5 as low stock
  );
  const outOfStockItems = inventory.filter(
    item => item.quantity === 0 // Out of stock items with quantity 0
  );

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
            Welcome to the Dashboard, {username}! Here, you can find a summary of all critical data points, giving you insights into the overall performance and status of your management system.
          </p>

          {/* Dashboard Stats */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>{totalProducts}</p>
            </div>
            <div className="stat-card">
              <h3>Low Stock</h3>
              <p>{lowStockCount}</p>
            </div>
            <div className="stat-card">
              <h3>Out of Stock</h3>
              <p>{outOfStockCount}</p>
            </div>
            <div className="stat-card">
              <h3>Username</h3>
              <p>{username}</p>
            </div>
          </div>

          {/* Restock list section */}
          <div className="restock-alert">
            <h3>Restock Items</h3>
            <table className="list-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.concat(outOfStockItems).map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td className={item.quantity === 0 ? 'out-stock' : 'low-stock'}>
                      {item.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
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
