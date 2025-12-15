const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function checkAssaAbloyData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    
    console.log('Checking Assa Abloy data...');
    
    // Check total Assa Abloy records
    const totalAssaAbloy = await AllegionSet.countDocuments({ brand: 'Assa Abloy' });
    console.log(`Total Assa Abloy records: ${totalAssaAbloy}`);
    
    // Check hardware types
    const hardwareTypes = await AllegionSet.distinct('hardwareType', { brand: 'Assa Abloy' });
    console.log('Assa Abloy Hardware Types:');
    hardwareTypes.forEach(type => console.log(`- "${type}"`));
    
    // Check locations
    const locations = await AllegionSet.distinct('location', { brand: 'Assa Abloy' });
    console.log('Assa Abloy Locations:');
    locations.forEach(loc => console.log(`- "${loc}"`));
    
    // Sample record
    const sampleRecord = await AllegionSet.findOne({ brand: 'Assa Abloy' });
    console.log('\nSample Assa Abloy record:');
    console.log('Brand:', sampleRecord.brand);
    console.log('Hardware Type:', sampleRecord.hardwareType);
    console.log('Location:', sampleRecord.location);
    console.log('Hardware Description:', sampleRecord.hardwareDescription);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAssaAbloyData();