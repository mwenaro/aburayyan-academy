const path = require('path');
const xlsx = require('xlsx');

const filePath = path.resolve(__dirname, '..', 'doc', 'WEEKLY ASSESMENTS MARKLIST TEMPLATE-Grade 6 - assessment 2.xlsx');
console.log('Reading:', filePath);

const wb = xlsx.readFile(filePath);
console.log('Sheets:', wb.SheetNames);

wb.SheetNames.forEach(name => {
  const sheet = wb.Sheets[name];
  const json = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });
  console.log('\n--- Sheet:', name, '---');
  const rows = json.slice(0, 8);
  rows.forEach((r, i) => console.log(i + 1, JSON.stringify(r)));
});
