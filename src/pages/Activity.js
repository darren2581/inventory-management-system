import { React, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from '../Firebase';
import '../styles/Sidebar.css';
import '../styles/Activity.css';
import { Link } from 'react-router-dom';

const Activity = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state for quantity

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

  useEffect(() => {
    fetchInventory(); // Fetch inventory when the component mounts
  }, []);

  // Function to handle taking an item (decreasing quantity)
  const takeItem = async () => {
    if (!itemName || !itemQuantity || itemQuantity <= 0) {
      alert("Please enter both Item Name and a valid Quantity.");
      return;
    }

    // Convert itemQuantity to a number
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

          // alert(`Successfully took ${quantityToTake} item(s) of ${product.name}`);
          fetchInventory(); // Refresh inventory after the update
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
            Welcome to the Activity section! Here, you can manage the inventory by adding or removing items.
            This section allows you to keep track of your product inventory, ensuring that everything stays up-to-date and well-managed.
            You can view your current inventory and perform actions such as taking stock out when needed.
          </p>
          <div className="inventory-management">
            <h3>Inventory Management</h3>

            {/* Search Bar */}
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

            {/* Input Section */}
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

            {/* Inventory List */}
            <div className="inventory-list">
              <h3>Inventory Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => {
                      const quantity = item.quantity === "N/A" ? 0 : item.quantity; // If quantity is "N/A", set it to 0
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{quantity}</td>
                          <td>{quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
                        </tr>
                      );
                    })
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
