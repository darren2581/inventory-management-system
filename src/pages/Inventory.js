import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../Firebase';
import '../styles/Sidebar.css';
import '../styles/Inventory.css';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // For tracking which product is being edited
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    status: 'In Stock',
  });

  const addProductSectionRef = useRef(null); // Ref to the Add/Edit product section

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
  
    const newProduct = {
      name: formData.name,
      quantity: parseInt(formData.quantity, 10),
      status: formData.status,
    };
  
    // Check for duplicate name
    const duplicateProduct = products.find(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );
  
    if (duplicateProduct) {
      alert("A product with the same name already exists!");
      return;
    }
  
    try {
      await addDoc(collection(db, "products"), newProduct);
      alert("Product added successfully!");
      setFormData({ name: '', quantity: '', status: 'In Stock' }); // Reset form
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

  const deleteProduct = async (productId) => {
    try {
      const productDocRef = doc(db, "products", productId);
      await deleteDoc(productDocRef);
      setProducts(products.filter(product => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Failed to delete product!");
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      quantity: product.quantity,
      status: product.status,
    });
    addProductSectionRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    try {
      const productDocRef = doc(db, "products", editingProduct.id);
      await updateDoc(productDocRef, {
        name: formData.name,
        quantity: parseInt(formData.quantity, 10),
        status: formData.status,
      });
      setEditingProduct(null); // Clear editing state
      setFormData({ name: '', quantity: '', status: 'In Stock' }); // Reset form
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("Failed to update product!");
    }
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
          <div className="add-product" ref={addProductSectionRef}>
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={editingProduct ? updateProduct : addProduct}>
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />

              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter quantity"
                required
              />

              <label>Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <button type="submit" className="btn">{editingProduct ? 'Update Product' : 'Add Product'}</button>
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
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.status}</td>
                    <td>
                      <button className="btn" onClick={() => editProduct(product)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="btn" onClick={() => deleteProduct(product.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="4">No products found.</td>
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
