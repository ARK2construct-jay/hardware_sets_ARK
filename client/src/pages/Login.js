import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Form data:', formData);
    setLoading(true);
    setError('');

    // Create axios instance with timeout
    const axiosInstance = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 10000
    });

    console.log('Attempting login with:', formData);

    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Token saved, forcing page reload');
        // Force page reload to trigger authentication check
        window.location.reload();
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Connection timeout. Please check if server is running.');
      } else if (error.response) {
        setError(error.response.data?.message || 'Login failed');
      } else if (error.request) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div>Logging you in...</div>
      </div>
    );
  }

  return (
    <>
      {/* Floating hardware elements */}
      <div className="hardware-float hardware-float-1"></div>
      <div className="hardware-float hardware-float-2"></div>
      <div className="hardware-float hardware-float-3"></div>
      
      <div className="form-container">
        <h2>🔐 Hardware Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className={`btn ${loading ? 'loading' : ''}`} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
        <p style={{marginTop: '20px', textAlign: 'center'}}>
          Don't have an account? <Link to="/register" style={{color: '#667eea', textDecoration: 'none', fontWeight: '600'}}>Register here</Link>
        </p>
        <p style={{marginTop: '10px', textAlign: 'center'}}>
          <Link to="/reset-password" style={{color: '#f093fb', textDecoration: 'none', fontWeight: '600'}}>Forgot Password?</Link>
        </p>
      </div>
    </>);
}

export default Login;