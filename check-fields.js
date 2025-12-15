const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function checkFields() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    const sampleRecord = await AllegionSet.findOne();
    if (sampleRecord) {
      console.log('Available fields in database:');
      Object.keys(sampleRecord.toObject()).forEach(key => {
        console.log(`- "${key}": "${sampleRecord[key]}"`);
      });
    } else {
      console.log('No records found in database');
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkFields();