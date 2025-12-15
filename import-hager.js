const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function importHagerData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Read Excel file
    const workbook = XLSX.readFile('Hager Generic Set 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in Hager Excel`);
    console.log('Sample row:', jsonData[0]);
    
    // Process and insert new data
    const insertData = jsonData.map((row) => {
      const processedRow = {
        brand: row['Brand'] || 'Hager',
        hardwareType: row['Hardware'],
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
    console.log(`Successfully imported ${insertData.length} Hager records`);
    
    // Show total count
    const totalCount = await AllegionSet.countDocuments();
    console.log(`Total records in database: ${totalCount}`);
    
    // Show unique hardwareTypes for Hager
    const hagerTypes = await AllegionSet.distinct('hardwareType', { brand: 'Hager' });
    console.log('Hager hardwareTypes:', hagerTypes);
    
    mongoose.disconnect();
    console.log('Hager import completed successfully!');
  } catch (error) {
    console.error('Import error:', error.message);
  }
}

importHagerData();