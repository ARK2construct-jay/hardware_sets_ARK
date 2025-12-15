const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function bulkUpdateLocation() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    // Example: Update multiple locations at once
    const updates = [
      { oldLocation: 'Building Entry (Exterior)', newLocation: 'Building Entry (Exterior) - Updated' },
      { oldLocation: 'Amenity (Interior)', newLocation: 'Amenity (Interior) - Updated' }
      // Add more location updates here
    ];
    
    for (const update of updates) {
      const result = await AllegionSet.updateMany(
        { location: update.oldLocation },
        { $set: { location: update.newLocation } }
      );
      console.log(`Updated ${result.modifiedCount} records: "${update.oldLocation}" → "${update.newLocation}"`);
    }
    
    mongoose.disconnect();
    console.log('Bulk update completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

bulkUpdateLocation();