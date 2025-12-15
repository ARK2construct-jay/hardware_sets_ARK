const XLSX = require('xlsx');

try {
  console.log('Reading Excel file...');
  const workbook = XLSX.readFile('Allegion Generic Set.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  console.log('Excel Columns Found:');
  if (jsonData.length > 0) {
    Object.keys(jsonData[0]).forEach(key => {
      console.log(`- "${key}"`);
    });
    
    console.log('\nFirst 3 rows data:');
    jsonData.slice(0, 3).forEach((row, index) => {
      console.log(`Row ${index + 1}:`, row);
    });
  }
} catch (error) {
  console.error('Error:', error.message);
}