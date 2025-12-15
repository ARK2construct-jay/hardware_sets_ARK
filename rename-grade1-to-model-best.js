const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function renameGrade1ToModelBest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Get all Best/Dormakaba Residential Hardware records
    const records = await AllegionSet.find({ 
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Residential Hardware'
    });
    
    console.log(`Found ${records.length} Best/Dormakaba Residential Hardware records`);

    // Update each record - rename "Grade 1" field to "Model Number"
    for (let record of records) {
      if (record['Grade 1']) {
        record['Model Number'] = record['Grade 1'];
        delete record['Grade 1'];
        await record.save();
      }
    }

    console.log('Successfully renamed "Grade 1" to "Model Number" for Best/Dormakaba Residential Hardware');
    
    // Verify the change
    const sampleRecord = await AllegionSet.findOne({ 
      brand: 'Best/Dormakaba',
      hardwareType: 'Best/Dormakaba Residential Hardware'
    });
    
    console.log('Sample record fields:', Object.keys(sampleRecord.toObject()));
    console.log('Model Number value:', sampleRecord['Model Number']);

    mongoose.disconnect();
    console.log('Field rename completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

renameGrade1ToModelBest();