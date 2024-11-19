import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Inventory from './pages/Inventory';
import Stocks from './pages/Stocks';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for each component */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
