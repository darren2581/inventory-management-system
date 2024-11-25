import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import '../styles/Sidebar.css';
import '../styles/Inventory.css';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const addProduct = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const newProduct = {
      name: formData.get("name"),
      id: formData.get("id"),
      quantity: parseInt(formData.get("quantity"), 10),
      status: formData.get("status"),
    };
  
    // Check for duplicate name or ID
    const duplicateProduct = products.find(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase() || product.id === newProduct.id
    );
  
    if (duplicateProduct) {
      alert("A product with the same name or ID already exists!");
      return; // Stop further execution
    }
  
    try {
      await addDoc(collection(db, "products"), newProduct);
      alert("Product added successfully!");
      event.target.reset(); // Clear the form after submission
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product!");
    }
  };

  const fetchProducts = () => {
    const productsRef = collection(db, "products");
    onSnapshot(productsRef, (snapshot) => {
      const fetchedProducts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <div className="inventory">
        <div className="container-inventory">
          <h2 className="h2-Inventory">Inventory</h2>
          <p className="p-Inventory">
            The Inventory section allows you to view, manage, and update your product stock levels.
            You can monitor your inventory, track products, and make necessary updates in the system.
            Remember to keep your inventory up-to-date to ensure smooth operations.
          </p>

          {/* Add Product Section */}
          <div className="add-product">
            <h3>Add New Product</h3>
            <form onSubmit={addProduct}>
              <label>Product Name:</label>
              <input type="text" name="name" placeholder="Enter product name" required />

              <label>Unique ID:</label>
              <input type="text" name="id" placeholder="Enter unique id" required />

              <label>Quantity:</label>
              <input type="number" name="quantity" placeholder="Enter quantity" required />

              <label>Status:</label>
              <select name="status" required>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <button type="submit" className="btn">Add Product</button>
            </form>

          </div>

          {/* Inventory Table */}
          <div className="inventory-table">
            <h3 className="head-inventory">Current Inventory</h3>

            {/* Search Bar */}
            <div className="search-bar">
              <label htmlFor="search">Search Products:</label>
              <input
                type="text"
                id="search"
                placeholder="Type product name..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.status}</td>
                    <td>
                      <button className="btn">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="btn">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
