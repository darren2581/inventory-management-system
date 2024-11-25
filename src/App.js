import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import Activity from './pages/Activity';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import SignOut from './pages/SignOut';
import NewProfileDetails from './pages/NewProfileDetails';
import { onAuthStateChanged } from 'firebase/auth';
import ResetPassword from './pages/ResetPassword';
import { auth } from './Firebase';

// PrivateRoute component for protected routes
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading after the auth check
    });
    return () => unsubscribe();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/newProfileDetails"
            element={<PrivateRoute user={user}><NewProfileDetails /></PrivateRoute>}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute user={user}><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/inventory"
            element={<PrivateRoute user={user}><Inventory /></PrivateRoute>}
          />
          <Route
            path="/activity"
            element={<PrivateRoute user={user}><Activity /></PrivateRoute>}
          />
          <Route
            path="/profile"
            element={<PrivateRoute user={user}><Profile /></PrivateRoute>}
          />
          <Route
            path="/signout"
            element={<PrivateRoute user={user}><SignOut /></PrivateRoute>} // SignOut is now protected
          />

          <Route path="/reset" element={<ResetPassword />} />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
