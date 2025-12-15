const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function importPDQCalRoyalData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Read PDQ-Cal Royal Excel file
    const workbook = XLSX.readFile('PDQ-Cal RoyalGeneric Set 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in PDQ-Cal Royal Excel`);
    console.log('Sample row:', jsonData[0]);
    
    // Process and insert new data
    const insertData = jsonData.map((row, index) => {
      return {
        brand: 'PDQ-Cal Royal',
        hardwareType: row['Hardware'] || 'PDQ-Cal Royal Standard Hardware',
        location: row['Location'] || '',
        hardwareDescription: row['Hardware Discrition'] || row['Hardware Description'] || '',
        // Add all other Excel fields
        ...row
      };
    });
    
    await AllegionSet.insertMany(insertData);
    console.log(`Successfully imported ${insertData.length} PDQ-Cal Royal records`);
    
    // Show total count
    const totalRecords = await AllegionSet.countDocuments();
    console.log(`Total records in database: ${totalRecords}`);
    
    mongoose.disconnect();
    console.log('PDQ-Cal Royal data import completed!');
  } catch (error) {
    console.error('Import error:', error.message);
    console.error('Full error:', error);
  }
}

importPDQCalRoyalData();