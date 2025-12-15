const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function renameAssaAbloyGrade1() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    // Rename Grade 1 to Model Number for Assa Abloy Residential Hardware
    const result = await AllegionSet.updateMany(
      { 
        brand: 'Assa Abloy',
        hardwareType: 'Assa Abloy Residential Hardware'
      },
      { 
        $rename: { 'Grade 1': 'Model Number' }
      }
    );
    
    console.log(`Updated ${result.modifiedCount} Assa Abloy Residential Hardware records`);
    console.log('Grade 1 field renamed to Model Number for Assa Abloy Residential');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

renameAssaAbloyGrade1();