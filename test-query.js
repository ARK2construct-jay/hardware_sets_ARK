const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function testQuery() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    // Test exact query
    const query = {
      brand: 'Allegion',
      hardwareType: 'Allegion Standard Hardware',
      location: 'Building Entry (Exterior)'
    };
    
    console.log('Testing query:', query);
    const results = await AllegionSet.find(query);
    console.log(`Found ${results.length} results`);
    
    if (results.length === 0) {
      console.log('\nTrying partial matches...');
      
      // Check brand only
      const brandResults = await AllegionSet.find({ brand: 'Allegion' });
      console.log(`Brand "Allegion" matches: ${brandResults.length}`);
      
      // Check hardware type
      const hardwareResults = await AllegionSet.find({ hardwareType: 'Allegion Standard Hardware' });
      console.log(`Hardware type matches: ${hardwareResults.length}`);
      
      // Check location
      const locationResults = await AllegionSet.find({ location: 'Building Entry (Exterior)' });
      console.log(`Location matches: ${locationResults.length}`);
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testQuery();