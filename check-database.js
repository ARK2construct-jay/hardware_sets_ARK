const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    const totalRecords = await AllegionSet.countDocuments();
    console.log(`Total records in database: ${totalRecords}`);

    const sampleRecords = await AllegionSet.find().limit(5);
    console.log('\nSample records:');
    sampleRecords.forEach((record, index) => {
      console.log(`Record ${index + 1}:`);
      console.log(`- Brand: "${record.brand}"`);
      console.log(`- Hardware Type: "${record.hardwareType}"`);
      console.log(`- Location: "${record.location}"`);
      console.log(`- Hardware Description: "${record.hardwareDescription}"`);
      console.log('---');
    });

    const uniqueHardwareTypes = await AllegionSet.distinct('hardwareType');
    console.log('\nUnique Hardware Types in database:');
    uniqueHardwareTypes.forEach(type => {
      console.log(`- "${type}"`);
    });

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();