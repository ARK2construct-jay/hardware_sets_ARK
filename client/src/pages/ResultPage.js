import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const selectionData = JSON.parse(localStorage.getItem('selectionData'));
        if (!selectionData) {
          navigate('/main');
          return;
        }

        const axiosInstance = axios.create({
          baseURL: process.env.NODE_ENV === 'production' 
            ? process.env.REACT_APP_API_URL 
            : 'http://localhost:5000',
          timeout: 10000
        });
        const response = await axiosInstance.post('/api/data/fetch', selectionData);
        setResults(response.data);
      } catch (error) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  const handleBack = () => {
    navigate('/main');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectionData');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div>Loading hardware results...</div>
      </div>
    );
  }

  return (
    <>
      {/* Floating hardware elements */}
      <div className="hardware-float hardware-float-1"></div>
      <div className="hardware-float hardware-float-2"></div>
      <div className="hardware-float hardware-float-3"></div>
      
      <div className="results-container">
        <button onClick={handleLogout} className="btn logout-btn">
          🚀 Logout
        </button>
        
        <h2>📈 Hardware Results</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {!results.tableData || results.tableData.length === 0 ? (
        <div>
          <p>No results found for your selection.</p>
          <button onClick={handleBack} className="btn">
            ← Back to Selection
          </button>
        </div>
      ) : (
        <div>
          <p>Found {results.totalRecords} matching hardware items:</p>
          
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  {results.tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.tableData.map((item, index) => {
                  const highlightKeywords = [
                    'hinge', 'exit device', 'closer', 'entry lock', 'manual flushbolt',
                    'storeroom lock', 'entry/office lock', 'automatic flush bolts',
                    'privacy lock', 'passage lock', 'spring hinge', 'viewer',
                    'ball catch', 'cylinder only deadbolt', 'deadbolt',
                    'double acting hinge', 'edge pull', 'flush pull'
                  ];
                  
                  const shouldHighlight = item.hardwareDescription && 
                    highlightKeywords.some(keyword => 
                      item.hardwareDescription.toLowerCase().includes(keyword.toLowerCase())
                    );
                  
                  return (
                    <tr key={index} style={shouldHighlight ? {backgroundColor: '#d4edda', border: '2px solid #28a745'} : {}}>
                      <td>{item.hardwareDescription || item['Hardware Description'] || ''}</td>
                      <td>{item.Manufacture || ''}</td>
                      {results.tableHeaders.includes('Grade 1') && <td>{item['Grade 1'] || ''}</td>}
                      {results.tableHeaders.includes('Grade 2') && <td>{item['Grade 2'] || ''}</td>}
                      {results.tableHeaders.includes('Economical grade') && <td>{item['Economical grade'] || ''}</td>}
                      {results.tableHeaders.includes('Model Number') && <td>{item['Model Number'] || ''}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="note-container" style={{marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', border: '1px solid #28a745', borderRadius: '4px'}}>
            <p style={{margin: '0', fontStyle: 'italic', color: '#155724'}}>
              <strong>Note:</strong> The highlighted products are key hardware items.
            </p>
          </div>
          
          <button onClick={handleBack} className="btn" style={{marginTop: '20px'}}>
            ← Back to Selection
          </button>
        </div>
      )}
      </div>
    </>);
}

export default ResultPage;
// Updated note text - deployment timestamp