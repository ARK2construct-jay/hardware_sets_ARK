const mongoose = require('mongoose');
const AllegionSet = require('./models/AllegionSet');
require('dotenv').config();

const sampleData = [
  {
    brand: 'Allegion',
    hardwareType: 'Allegion Standard Hardware',
    location: 'Building Entry (Exterior)',
    description: 'Schlage Commercial Grade Lockset',
    partNumber: 'AL-ND80PD-RHO-626',
    specifications: 'Heavy duty cylindrical lockset, Grade 1, ANSI/BHMA A156.2'
  },
  {
    brand: 'Allegion',
    hardwareType: 'Allegion Standard Hardware',
    location: 'Unit Entry - Non-ADA (Interior)',
    description: 'Schlage Residential Deadbolt',
    partNumber: 'AL-B60N-619',
    specifications: 'Single cylinder deadbolt, Grade 2, 1" throw'
  },
  {
    brand: 'Allegion',
    hardwareType: 'Allegion Economical Hardware',
    location: 'Common Area/Office (Interior)',
    description: 'Schlage Economy Passage Set',
    partNumber: 'AL-F10-ACC-619',
    specifications: 'Passage function, Grade 3, residential duty'
  },
  {
    brand: 'Assa Abloy',
    hardwareType: 'Assa Abloy Standard Hardware',
    description: 'Yale Commercial Mortise Lock',
    partNumber: 'AA-8800FL-12V-24V',
    specifications: 'Electric mortise lock, fail secure, 12-24V DC'
  },
  {
    brand: 'Assa Abloy',
    hardwareType: 'Assa Abloy Residential Hardware',
    description: 'Yale Residential Smart Lock',
    partNumber: 'AA-YRD256-ZW2-619',
    specifications: 'Z-Wave enabled, touchscreen, auto-lock'
  },
  {
    brand: 'Hager',
    hardwareType: 'Hager Standard Hardware',
    description: 'Hager Heavy Duty Hinge',
    partNumber: 'HG-BB1279-4.5x4.5-USP',
    specifications: '4.5" x 4.5" ball bearing hinge, prime coat finish'
  },
  {
    brand: 'Hager',
    hardwareType: 'Hager Residential Hardware',
    description: 'Hager Residential Door Closer',
    partNumber: 'HG-5040-ALUM',
    specifications: 'Surface mounted, aluminum finish, adjustable spring'
  },
  {
    brand: 'Best/Dormakaba',
    hardwareType: 'Best/Dormakaba Standard Hardware',
    description: 'Best Access Control Lock',
    partNumber: 'BD-45H7D15H626',
    specifications: 'Interchangeable core, Grade 1, heavy duty'
  },
  {
    brand: 'Best/Dormakaba',
    hardwareType: 'Best/Dormakaba Economical Hardware',
    description: 'Dormakaba Basic Lever Set',
    partNumber: 'BD-9K30D15D626',
    specifications: 'Cylindrical lever lock, Grade 2, satin chrome'
  }
];

async function importSampleData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    console.log('Connected to MongoDB');

    await AllegionSet.deleteMany({});
    await AllegionSet.insertMany(sampleData);
    
    console.log(`Imported ${sampleData.length} sample records`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Import error:', error);
  }
}

if (require.main === module) {
  importSampleData();
}

module.exports = importSampleData;