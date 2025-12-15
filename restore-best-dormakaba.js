const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

async function restoreBestDormakaba() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    // Delete all Best/Dormakaba records
    await AllegionSet.deleteMany({ brand: 'Best/Dormakaba' });
    console.log('Deleted all Best/Dormakaba records');

    mongoose.disconnect();
    console.log('Restoration completed - Best/Dormakaba records removed');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

restoreBestDormakaba();