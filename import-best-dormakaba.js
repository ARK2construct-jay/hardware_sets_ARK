const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function importBestDormakabaData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Read Excel file
    const workbook = XLSX.readFile('Best-Dormakaba Generic Set 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in Best-Dormakaba Excel`);
    console.log('Sample row:', jsonData[0]);
    
    // Process and insert new data
    const insertData = jsonData.map((row) => {
      const processedRow = {
        brand: row['Brand'] || 'Best/Dormakaba',
        hardwareType: row['Hardware'] || 'Best/Dormakaba Standard Hardware',
        location: row['Location'] || '',
        hardwareDescription: row['Hardware Discrition'] || row['Hardware Description'] || ''
      };
      
      // Add all other Excel fields except unwanted ones
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
    console.log(`Successfully imported ${insertData.length} Best/Dormakaba records`);
    
    // Show total count
    const totalCount = await AllegionSet.countDocuments();
    console.log(`Total records in database: ${totalCount}`);
    
    mongoose.disconnect();
    console.log('Best/Dormakaba import completed successfully!');
  } catch (error) {
    console.error('Import error:', error.message);
  }
}

importBestDormakabaData();