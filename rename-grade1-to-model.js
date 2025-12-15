const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function renameGrade1ToModel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    // Rename Grade 1 field to Model Number for Residential Hardware
    const result = await AllegionSet.updateMany(
      { hardwareType: 'Allegion Residential Hardware' },
      { 
        $rename: { 'Grade 1': 'Model Number' }
      }
    );
    
    console.log(`Updated ${result.modifiedCount} Residential Hardware records`);
    console.log('Grade 1 field renamed to Model Number');
    
    mongoose.disconnect();
    console.log('Field rename completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

renameGrade1ToModel();