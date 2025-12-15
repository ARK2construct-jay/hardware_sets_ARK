const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function renamePDQGrade1ToModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    const result = await AllegionSet.updateMany(
      { 
        brand: 'PDQ-Cal Royal',
        hardwareType: 'PDQ-Cal Royal Residential Hardware'
      },
      { 
        $rename: { 'Grade 1': 'Model Number' }
      }
    );

    console.log(`Updated ${result.modifiedCount} PDQ-Cal Royal Residential Hardware records`);
    console.log('Renamed "Grade 1" to "Model Number"');
    
    mongoose.disconnect();
    console.log('Field rename completed!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

renamePDQGrade1ToModel();