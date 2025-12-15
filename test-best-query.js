const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function testBestQuery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Test exact query that should work
    const query = {
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Standard Hardware',
      location: 'Building Entry (Exterior)'
    };
    
    console.log('Testing query:', query);
    
    const results = await AllegionSet.find(query);
    console.log(`Found ${results.length} results`);
    
    if (results.length > 0) {
      console.log('Sample result:', {
        brand: results[0].brand,
        hardwareType: results[0].hardwareType,
        location: results[0].location,
        hardwareDescription: results[0].hardwareDescription
      });
    }
    
    // Test without location
    const queryWithoutLocation = {
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Standard Hardware'
    };
    
    console.log('\nTesting without location:', queryWithoutLocation);
    const resultsWithoutLocation = await AllegionSet.find(queryWithoutLocation);
    console.log(`Found ${resultsWithoutLocation.length} results without location filter`);

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBestQuery();