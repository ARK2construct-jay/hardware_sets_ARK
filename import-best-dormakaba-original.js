const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function importBestDormakabaOriginal() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    const workbook = XLSX.readFile('Best-Dormakaba Generic Set 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in Best-Dormakaba Excel`);
    
    // Import with original Excel values - no modifications
    const insertData = jsonData.map((row) => {
      const processedRow = {
        brand: row['Brand'] || 'Best/Dormakaba',
        hardwareType: row['Hardware'], // Keep original Excel value
        location: row['Location'] || '',
        hardwareDescription: row['Hardware Discrition'] || row['Hardware Description'] || ''
      };
      
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
    console.log(`Successfully imported ${insertData.length} Best/Dormakaba records with original values`);
    
    // Show unique hardwareTypes
    const hardwareTypes = await AllegionSet.distinct('hardwareType', { brand: 'Best/Dormakaba' });
    console.log('Original hardwareTypes:', hardwareTypes);
    
    mongoose.disconnect();
    console.log('Original import completed!');
  } catch (error) {
    console.error('Import error:', error.message);
  }
}

importBestDormakabaOriginal();