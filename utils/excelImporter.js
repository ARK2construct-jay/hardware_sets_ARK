const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('../models/AllegionSet');
require('dotenv').config();

async function importExcelData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Read Excel file
    const workbook = XLSX.readFile('Allegion Generic Set.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in Excel`);
    console.log('Sample row:', jsonData[0]);
    
    // Clear existing data
    await AllegionSet.deleteMany({});
    console.log('Cleared existing data');
    
    // Process and insert new data - exclude only description, partNumber, specifications
    const insertData = jsonData.map((row, index) => {
      const processedRow = {
        brand: row['Brand'] || 'Allegion',
        hardwareType: row['Hardware'] || 'Allegion Standard Hardware',
        location: row['Location'] || '',
        hardwareDescription: row['Hardware Discrition'] || row['Hardware Description'] || ''
      };
      
      // Add all other Excel fields except the 3 unwanted ones
      Object.keys(row).forEach(key => {
        const lowerKey = key.toLowerCase();
        if (!lowerKey.includes('description') && 
            !lowerKey.includes('partnumber') && 
            !lowerKey.includes('part number') &&
            !lowerKey.includes('specification')) {
          processedRow[key] = row[key];
        }
      });
      
      return processedRow;
    });
    
    await AllegionSet.insertMany(insertData);
    console.log(`Successfully imported ${insertData.length} records from Excel`);
    
    // Show sample of imported data
    const sampleData = await AllegionSet.find().limit(3);
    console.log('Sample imported records:', sampleData);
    
    mongoose.disconnect();
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Import error:', error.message);
    console.error('Full error:', error);
  }
}

// Run if called directly
if (require.main === module) {
  importExcelData();
}

module.exports = importExcelData;