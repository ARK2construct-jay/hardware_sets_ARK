const express = require('express');
const AllegionSet = require('../models/AllegionSet');

const router = express.Router();

// Get hardware data based on selection
router.post('/fetch', async (req, res) => {
  try {
    const { brand, hardwareType, location } = req.body;
    console.log('\n=== NEW QUERY ===');
    console.log('Query inputs:', { brand, hardwareType, location });
    
    // Only use 3 input fields for filtering
    let query = { brand, hardwareType };
    console.log('Initial query:', query);
    console.log('Brand check:', brand);
    console.log('Location check:', location);
    console.log('Brand === Best/Dormakaba:', brand === 'Best/Dormakaba');
    console.log('Location exists:', !!location);
    
    if ((brand === 'Allegion' || brand === 'Assa Abloy' || brand === 'Best/Dormakaba' || brand === 'Hager' || brand === 'PDQ-Cal Royal') && location) {
      query.location = location;
      console.log('Location added to query - Final query:', query);
    } else {
      console.log('Location NOT added to query - Final query:', query);
    }
    
    const results = await AllegionSet.find(query);
    console.log(`Found ${results.length} results`);
    
    // Define table headers based on hardware type
    let tableHeaders = [];
    
    if (hardwareType === 'Allegion Standard Hardware' || hardwareType === 'Allegion Economical Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture', 
        'Grade 1',
        'Grade 2',
        'Economical grade'
      ];
    } else if (hardwareType === 'Allegion Residential Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    } else if (hardwareType === 'Assa Abloy Standard Hardware' || hardwareType === 'Assa Abloy Economical Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture', 
        'Grade 1',
        'Grade 2',
        'Economical grade'
      ];
    } else if (hardwareType === 'Assa Abloy Residential Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    } else if (hardwareType === 'Best/Dormakaba Standard Hardware' || hardwareType === 'Best/Dormakaba Economical Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture', 
        'Grade 1',
        'Grade 2',
        'Economical grade'
      ];
    } else if (hardwareType === 'Best/Dormakaba Residential Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    } else if (hardwareType === 'Hager Standard Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture', 
        'Grade 1',
        'Grade 2',
        'Economical grade'
      ];
    } else if (hardwareType === 'Hager Residential Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    } else if (hardwareType === 'PDQ-Cal Royal Standard Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture', 
        'Grade 1',
        'Grade 2',
        'Economical grade'
      ];
    } else if (hardwareType === 'PDQ-Cal Royal Residential Hardware') {
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    } else {
      // Default headers for other hardware types
      tableHeaders = [
        'Hardware Description',
        'Manufacture',
        'Model Number'
      ];
    }
    
    // Format response with table structure
    const response = {
      tableHeaders: tableHeaders,
      tableData: results,
      totalRecords: results.length,
      query: query
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;