import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db, auth } from '../Firebase';
import '../styles/Sidebar.css';
import '../styles/Activity.css';
import { Link } from 'react-router-dom';

const Activity = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState(null); // store user details
  const [username, setUsername] = useState(''); // store the username

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch inventory data from Firebase
  const fetchInventory = () => {
    const productsRef = collection(db, "products");
    onSnapshot(productsRef, (snapshot) => {
      const fetchedInventory = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(fetchedInventory);
    });
  };

  // Fetch user activity from Firestore
  const fetchActivities = async () => {
    const activitiesRef = collection(db, "activities");
    const activitySnapshot = await getDocs(activitiesRef);
    const activityList = activitySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setActivities(activityList);
  };

  // Fetch username from Firestore based on user UID
  const fetchUsername = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid); // Get the user document using UID
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUsername(userDoc.data().username); // Set the username if available
      } else {
        console.log("No username found in Firestore.");
      }
      setUser(currentUser); // Set the user details
    }
  };

  useEffect(() => {
    fetchInventory(); // Fetch inventory 
    fetchActivities(); // Fetch activities
    fetchUsername(); // Fetch username
  }, []);

  // Function to handle taking an item (decreasing quantity)
  const takeItem = async () => {
    if (!itemName || !itemQuantity || itemQuantity <= 0) {
      alert("Please enter both Item Name and a valid Quantity.");
      return;
    }

    const quantityToTake = parseInt(itemQuantity, 10);

    const product = inventory.find(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (product) {
      if (product.quantity >= quantityToTake) {
        try {
          // Get the reference to the product in Firestore
          const productDocRef = doc(db, "products", product.id);

          // Update the product quantity in Firebase
          await updateDoc(productDocRef, {
            quantity: product.quantity - quantityToTake, // Subtract the entered quantity
          });

          // Add activity to Firestore
          if (user) {
            await addDoc(collection(db, "activities"), {
              itemName: product.name,
              quantityTaken: quantityToTake,
              username: username || user.email, // Use the fetched username or fallback to email
              timestamp: new Date(),
            });
            fetchActivities(); // Refresh activities after the update
          }
        } catch (error) {
          console.error("Error updating item: ", error);
          alert("Failed to update item quantity.");
        }
      } else {
        alert("Not enough stock to take the requested quantity.");
      }
    } else {
      alert("Product not found.");
    }

    setItemQuantity('');
    setItemName('');
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter inventory based on the search query
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
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
            Welcome to the Activity section! Here, you can update the items that have been taken from the inventory.
            This section allows you to keep track of your product inventory, ensuring that everything stays up-to-date and well-managed.
            You can view your current inventory and perform actions such as taking stock out when needed.
          </p>
          <div className="inventory-management">
            <h3>Take Items</h3>

            {/* Search Bar for filtering items */}
            <div className="search-bar">
              <label htmlFor="search">Search Products:</label>
              <input
                type="text"
                id="search"
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {/* Dropdown for selecting items with search filter */}
            <div className="item-actions">
              <label>Product:</label>
              <select
                id="item-name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Select item">
                <option value="">Select Item</option>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name} - {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of Stock'}
                    </option>
                  ))
                ) : (
                  <option>No products found.</option>
                )}
              </select>
              <label>Quantity:</label>
              <input
                type="number"
                id="item-quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
              <button onClick={takeItem}>Take Item</button>
            </div>

            {/* Activity Log */}
            <div className="activity-list">
              <h3>Activity Log</h3>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Item</th>
                    <th>Quantity Taken</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length > 0 ? (
                    activities.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.username}</td>
                        <td>{activity.itemName}</td>
                        <td>{activity.quantityTaken}</td>
                        <td>{new Date(activity.timestamp.seconds * 1000).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No activity recorded.</td>
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
