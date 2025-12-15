import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
    
    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsAuthenticated(!!newToken);
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Router key={refreshKey}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/main" 
            element={isAuthenticated ? <MainPage key={refreshKey} /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/results" 
            element={isAuthenticated ? <ResultPage key={refreshKey} /> : <Navigate to="/login" replace />} 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;