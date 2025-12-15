import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedHardware, setSelectedHardware] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verify authentication and reset state on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Reset all selections when component mounts (fresh login)
      setSelectedBrand('');
      setSelectedHardware('');
      setSelectedLocation('');
      setLoading(false);
    }
  }, [navigate]);

  const brands = ['Allegion', 'Assa Abloy', 'Hager', 'Best/Dormakaba', 'PDQ-Cal Royal'];

  const hardwareOptions = {
    'Allegion': [
      'Allegion Standard Hardware',
      'Allegion Economical Hardware',
      'Allegion Residential Hardware'
    ],
    'Assa Abloy': [
      'Assa Abloy Standard Hardware',
      'Assa Abloy Economical Hardware',
      'Assa Abloy Residential Hardware'
    ],
    'Hager': [
      'Hager Standard Hardware',
      'Hager Residential Hardware'
    ],
    'Best/Dormakaba': [
      'Best/Dormakaba Standard Hardware',
      'Best/Dormakaba Economical Hardware',
      'Best/Dormakaba Residential Hardware'
    ],
    'PDQ-Cal Royal': [
      'PDQ-Cal Royal Standard Hardware',
      'PDQ-Cal Royal Residential Hardware'
    ]
  };

  const locations = [
    'Building Entry (Exterior)',
    'Amenity (Interior)',
    'Amenity (Exterior)',
    'Common Area/Office (Interior)',
    'Common Area/Office (Exterior)',
    'Common Area/Office - Emergency Egress (Interior)',
    'Room Utility (Interior)',
    'Room Utility (Exterior)',
    'Room Utility - Emergency Egress (Interior)',
    'Room Utility - Emergency Egress (Exterior)',
    'Closet - Utility (Interior)',
    'Common Area Bathroom (Interior)',
    'Stair (Interior)',
    'Stair (Exterior)',
    'Corridor/Hallway/Lobby (Interior)',
    'Corridor/Hallway/Lobby - Emergency Egress (Interior)',
    'Unit Entry - Non-ADA (Interior)',
    'Unit Entry - ADA (Interior)',
    'Unit Entry - Non-ADA (Exterior)',
    'Unit Entry - ADA (Exterior)',
    'Unit - Bed/Bath (Interior)',
    'Unit - closet (Interior)',
    'Unit Closet - Utility (Interior)',
    'Balcony (Exterior)',
    'Connecting Door (Interior)',
    'Communicating (Double Acting Door) (Interior)',
    'Bed/Bath - Pocket door (Interior)',
    'Closet - Bypass door (Interior)',
    'Barn door (Interior)',
    'Bi-fold door (Interior)'
  ];

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedHardware('');
    setSelectedLocation('');
  };

  const handleSubmit = () => {
    setLoading(true);
    
    const selectionData = {
      brand: selectedBrand,
      hardwareType: selectedHardware,
      location: (selectedBrand === 'Allegion' || selectedBrand === 'Best/Dormakaba' || selectedBrand === 'Hager' || selectedBrand === 'PDQ-Cal Royal') ? selectedLocation : null
    };
    
    localStorage.setItem('selectionData', JSON.stringify(selectionData));
    
    // Small delay to show loading state
    setTimeout(() => {
      navigate('/results');
    }, 500);
  };

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectionData');
    
    // Reset all state
    setSelectedBrand('');
    setSelectedHardware('');
    setSelectedLocation('');
    setLoading(false);
    
    // Force page reload to ensure clean state
    window.location.href = '/login';
  };

  const canSubmit = selectedBrand && selectedHardware && 
    ((selectedBrand !== 'Allegion' && selectedBrand !== 'Best/Dormakaba' && selectedBrand !== 'Hager' && selectedBrand !== 'PDQ-Cal Royal') || selectedLocation);

  return (
    <div className="selection-container">
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
      
      <h2>Hardware Selection</h2>
      
      <div className="step">
        <h3>Step 1: Select Brand</h3>
        <div className="form-group">
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">Choose a brand...</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedBrand && (
        <div className="step">
          <h3>Step 2: Select Hardware Type</h3>
          <div className="form-group">
            <select 
              value={selectedHardware} 
              onChange={(e) => setSelectedHardware(e.target.value)}
            >
              <option value="">Choose hardware type...</option>
              {hardwareOptions[selectedBrand].map(hardware => (
                <option key={hardware} value={hardware}>{hardware}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {(selectedBrand === 'Allegion' || selectedBrand === 'Best/Dormakaba' || selectedBrand === 'Hager' || selectedBrand === 'PDQ-Cal Royal') && selectedHardware && (
        <div className="step">
          <h3>Step 3: Select Location</h3>
          <div className="form-group">
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Choose location...</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {canSubmit && (
        <button onClick={handleSubmit} className={`btn ${loading ? 'loading' : ''}`} disabled={loading}>
          {loading ? 'Loading Results...' : 'Get Results'}
        </button>
      )}
    </div>
  );
}

export default MainPage;