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
            ? 'https://hardware-selection-system.onrender.com' 
            : 'http://localhost:5000'
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

  if (loading) return <div>Loading results...</div>;

  return (
    <div className="results-container">
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
      
      <h2>Hardware Results</h2>
      
      {error && <div className="error">{error}</div>}
      
      {!results.tableData || results.tableData.length === 0 ? (
        <div>
          <p>No results found for your selection.</p>
          <button onClick={handleBack} className="btn">
            Back to Selection
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
                {results.tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.hardwareDescription || item['Hardware Description'] || ''}</td>
                    <td>{item.Manufacture || ''}</td>
                    {results.tableHeaders.includes('Grade 1') && <td>{item['Grade 1'] || ''}</td>}
                    {results.tableHeaders.includes('Grade 2') && <td>{item['Grade 2'] || ''}</td>}
                    {results.tableHeaders.includes('Economical grade') && <td>{item['Economical grade'] || ''}</td>}
                    {results.tableHeaders.includes('Model Number') && <td>{item['Model Number'] || ''}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="note-container" style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px'}}>
            <p style={{margin: '0', fontStyle: 'italic', color: '#6c757d'}}>
              <strong>Note:</strong> The highlighted products require prep in the door/frame.
            </p>
          </div>
          
          <button onClick={handleBack} className="btn" style={{marginTop: '20px'}}>
            Back to Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
// Updated note text - deployment timestamp