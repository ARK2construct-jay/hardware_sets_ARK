const XLSX = require('xlsx');
const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function updateBestDormakabaNew() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Delete old Best/Dormakaba records
    await AllegionSet.deleteMany({ brand: 'Best/Dormakaba' });
    console.log('Deleted old Best/Dormakaba records');

    // Import new data from updated Excel
    const workbook = XLSX.readFile('Best-Dormakaba Generic Set 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${jsonData.length} rows in updated Best-Dormakaba Excel`);
    
    const insertData = jsonData.map((row) => {
      const processedRow = {
        brand: row['Brand'] || 'Best/Dormakaba',
        hardwareType: row['Hardware'],
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
    console.log(`Successfully imported ${insertData.length} new Best/Dormakaba records`);
    
    const totalCount = await AllegionSet.countDocuments();
    console.log(`Total records in database: ${totalCount}`);
    
    mongoose.disconnect();
    console.log('New Best/Dormakaba data imported successfully!');
  } catch (error) {
    console.error('Import error:', error.message);
  }
}

updateBestDormakabaNew();