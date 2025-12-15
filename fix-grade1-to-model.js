const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function fixGrade1ToModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Update using MongoDB updateMany operation
    const result = await AllegionSet.updateMany(
      { 
        brand: 'Best/Dormakaba',
        hardwareType: 'Best/Dormakaba Residential Hardware',
        'Grade 1': { $exists: true }
      },
      { 
        $rename: { 'Grade 1': 'Model Number' }
      }
    );

    console.log(`Updated ${result.modifiedCount} records`);
    
    // Verify the change
    const sampleRecord = await AllegionSet.findOne({ 
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Residential Hardware'
    });
    
    console.log('Sample record has Model Number:', !!sampleRecord['Model Number']);
    console.log('Sample record has Grade 1:', !!sampleRecord['Grade 1']);
    console.log('Model Number value:', sampleRecord['Model Number']);

    mongoose.disconnect();
    console.log('Field rename completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fixGrade1ToModel();