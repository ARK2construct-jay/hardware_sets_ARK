const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function updateBestDormakabaHardware() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Update all Best/Dormakaba records to have "Best/Dormakaba Residential Hardware"
    const result = await AllegionSet.updateMany(
      { brand: 'Best/Dormakaba' },
      { $set: { hardwareType: 'Best/Dormakaba Residential Hardware' } }
    );

    console.log(`Updated ${result.modifiedCount} Best/Dormakaba records`);
    
    // Verify the update
    const sampleRecords = await AllegionSet.find({ brand: 'Best/Dormakaba' }).limit(3);
    console.log('Sample updated records:', sampleRecords.map(r => ({ 
      brand: r.brand, 
      hardwareType: r.hardwareType 
    })));

    mongoose.disconnect();
    console.log('Update completed successfully!');
  } catch (error) {
    console.error('Update error:', error.message);
  }
}

updateBestDormakabaHardware();