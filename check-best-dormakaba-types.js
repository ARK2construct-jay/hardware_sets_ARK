const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function checkBestDormakabaTypes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Get all unique hardwareType values for Best/Dormakaba
    const hardwareTypes = await AllegionSet.distinct('hardwareType', { brand: 'Best/Dormakaba' });
    console.log('Current Best/Dormakaba hardwareTypes:', hardwareTypes);
    
    // Count records for each type
    for (let type of hardwareTypes) {
      const count = await AllegionSet.countDocuments({ 
        brand: 'Best/Dormakaba', 
        hardwareType: type 
      });
      console.log(`${type}: ${count} records`);
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkBestDormakabaTypes();