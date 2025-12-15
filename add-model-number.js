const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function addModelNumber() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    // Add Model Number field to Residential Hardware records
    const result = await AllegionSet.updateMany(
      { hardwareType: 'Allegion Residential Hardware' },
      { 
        $set: { 
          'Model Number': 'RES-' + Math.floor(Math.random() * 1000),
          modelNumber: 'RES-' + Math.floor(Math.random() * 1000)
        }
      }
    );
    
    console.log(`Updated ${result.modifiedCount} Residential Hardware records with Model Number`);
    
    mongoose.disconnect();
    console.log('Model Number added successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

addModelNumber();