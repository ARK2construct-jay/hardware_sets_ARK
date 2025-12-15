const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function debugQuery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Check what locations exist for Best/Dormakaba Standard Hardware
    const locations = await AllegionSet.distinct('location', { 
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Standard Hardware'
    });
    
    console.log('Available locations for Best/Dormakaba Standard Hardware:');
    console.log(locations);
    
    // Check sample records
    const sampleRecords = await AllegionSet.find({ 
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Standard Hardware'
    }).limit(3);
    
    console.log('\nSample records:');
    sampleRecords.forEach(record => {
      console.log({
        brand: record.brand,
        hardwareType: record.hardwareType,
        location: record.location,
        hardwareDescription: record.hardwareDescription
      });
    });

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugQuery();