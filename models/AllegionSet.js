const mongoose = require('mongoose');

const allegionSetSchema = new mongoose.Schema({
  brand: String,
  hardwareType: String,
  location: String,
  hardwareDescription: String
  // All other Excel fields will be included automatically
}, { strict: false }); // Allow all Excel fields except excluded ones

module.exports = mongoose.model('AllegionSet', allegionSetSchema, 'allegion_set');