const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// helper to write PDF table rows
function writeTableToPDF(doc, headers, rows, options = {}) {
  const { margin = 50, rowHeight = 18, headerFontSize = 10, rowFontSize = 9 } = options;
  const pageWidth = doc.page.width - margin * 2;
  const colCount = headers.length;
  const colWidth = pageWidth / colCount;

  let x = margin;
  let y = doc.y;
  doc.fontSize(headerFontSize).font('Helvetica-Bold');
  for (let i = 0; i < headers.length; i++) {
    doc.text(String(headers[i] || ''), x, y, { width: colWidth, ellipsis: true });
    x += colWidth;
  }
  y += rowHeight;
  doc.moveTo(margin, y - 6).lineTo(doc.page.width - margin, y - 6).stroke();

  doc.font('Helvetica').fontSize(rowFontSize);
  for (let r = 0; r < rows.length; r++) {
    x = margin;
    // if nearing bottom, add new page
    if (y + rowHeight > doc.page.height - margin) {
      doc.addPage();
      y = margin;
      doc.font('Helvetica-Bold').fontSize(headerFontSize);
      for (let i = 0; i < headers.length; i++) {
        doc.text(String(headers[i] || ''), x, y, { width: colWidth, ellipsis: true });
        x += colWidth;
      }
      y += rowHeight;
      doc.moveTo(margin, y - 6).lineTo(doc.page.width - margin, y - 6).stroke();
      doc.font('Helvetica').fontSize(rowFontSize);
    }

    const row = rows[r];
    x = margin;
    for (let c = 0; c < headers.length; c++) {
      const txt = row[c] === null || row[c] === undefined ? '' : String(row[c]);
      doc.text(txt, x, y, { width: colWidth, ellipsis: true });
      x += colWidth;
    }
    y += rowHeight;
  }
  doc.moveDown();
}

const workbookPath = path.resolve(__dirname, '..', 'doc', 'WEEKLY ASSESMENTS MARKLIST TEMPLATE-Grade 6 - assessment 2.xlsx');
const outDir = path.resolve(__dirname, '..', 'doc', 'reports');

if (!fs.existsSync(workbookPath)) {
  console.error('Workbook not found at', workbookPath);
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const wb = xlsx.readFile(workbookPath);
console.log('Found sheets:', wb.SheetNames);

function findHeaderRow(rows) {
  for (let i = 0; i < Math.min(rows.length, 12); i++) {
    const r = rows[i] || [];
    const nonEmpty = r.filter(c => c !== null && c !== undefined && String(c).trim() !== '');
    const joined = r.join(' ').toLowerCase();
    if (nonEmpty.length >= 2 && (joined.includes('name') || joined.includes('adm') || joined.includes('subject') || joined.includes('marks') || joined.includes('grade') || joined.includes('gender') )) {
      return i;
    }
  }
  for (let i = 0; i < Math.min(rows.length, 12); i++) {
    const r = rows[i] || [];
    const nonEmpty = r.filter(c => c !== null && c !== undefined && String(c).trim() !== '');
    if (nonEmpty.length >= 2) return i;
  }
  return 0;
}

function normalizeHeader(h) {
  return String(h || '').trim().replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function toNumber(v) {
  if (v === null || v === undefined || v === '') return NaN;
  const n = Number(String(v).replace(/,/g, '').trim());
  return isNaN(n) ? NaN : n;
}

wb.SheetNames.forEach(sheetName => {
  const sheet = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: null });
  if (!rows || rows.length === 0) return;

  const headerRowIdx = findHeaderRow(rows);
  const rawHeader = (rows[headerRowIdx] || []).map(normalizeHeader);

  // build raw records
  const rawRecords = [];
  for (let i = headerRowIdx + 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const allEmpty = r.every(c => c === null || c === undefined || String(c).trim() === '');
    if (allEmpty) continue;
    const obj = {};
    for (let j = 0; j < rawHeader.length; j++) {
      const key = rawHeader[j] || `col_${j+1}`;
      obj[key] = r[j] === undefined ? null : r[j];
    }
    rawRecords.push(obj);
  }

  if (rawRecords.length === 0) {
    console.log('Sheet', sheetName, 'has no data rows after header; skipping');
    return;
  }

  // Identify columns
  const headers = rawHeader.slice();
  // find name and gender columns
  const nameIdx = headers.findIndex(h => /name|student/i.test(h));
  const genderIdx = headers.findIndex(h => /gender|sex/i.test(h));

  // detect numeric subject columns: columns that are numeric for at least 30% of rows
  const numericCounts = headers.map((h, idx) => {
    let cnt = 0;
    for (let r of rawRecords) if (!isNaN(toNumber(r[h]))) cnt++;
    return cnt;
  });
  const numericCols = headers.filter((h, idx) => numericCounts[idx] >= Math.max(1, Math.floor(rawRecords.length * 0.3)));

  // exclude columns that are clearly name/gender/admission
  const excludedPatterns = [/name/i, /student/i, /gender/i, /sex/i, /adm/i, /admission/i, /class/i, /stream/i, /roll/i];
  const subjectCols = numericCols.filter(h => !excludedPatterns.some(rx => rx.test(h)));

  // Build output rows: Name, Gender, subjects..., Total, Rank
  const outRows = rawRecords.map(r => {
    const name = nameIdx >= 0 ? r[headers[nameIdx]] : (r[headers[0]] || '');
    const gender = genderIdx >= 0 ? r[headers[genderIdx]] : (r['Gender'] || r['gender'] || '');
    const subjects = subjectCols.map(c => {
      const v = toNumber(r[c]);
      return isNaN(v) ? (r[c] === null ? '' : String(r[c])) : v;
    });
    const total = subjects.reduce((a,b)=>a + (isNaN(Number(b)) ? 0 : Number(b)), 0);
    const rowObj = { Name: name, Gender: gender };
    subjectCols.forEach((c,i)=> rowObj[c] = subjects[i]);
    rowObj.Total = total;
    return rowObj;
  });

  // compute ranks (standard competition ranking: 1,2,2,4)
  const totals = outRows.map(r=>r.Total);
  const sorted = totals.slice().sort((a,b)=>b - a);
  const rankMap = new Map();
  for (let i = 0; i < sorted.length; i++) {
    const t = sorted[i];
    if (!rankMap.has(t)) rankMap.set(t, i + 1);
  }
  outRows.forEach(r => r.Rank = rankMap.get(r.Total) || null);

  // final headers order
  const finalHeaders = ['Name', 'Gender', ...subjectCols, 'Total', 'Rank'];

  // ensure outDir exists
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1) CSV
  const csvPath = path.join(outDir, `${sanitizeFileName(sheetName)}.csv`);
  const csvLines = [];
  csvLines.push(finalHeaders.join(','));
  outRows.forEach(r => {
    const vals = finalHeaders.map(h => {
      const v = r[h];
      if (v === null || v === undefined) return '';
      const s = String(v).replace(/"/g, '""');
      return /[,\n"]/g.test(s) ? `"${s}"` : s;
    });
    csvLines.push(vals.join(','));
  });
  fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');

  // 2) Excel (exceljs)
  const xlsxPath = path.join(outDir, `${sanitizeFileName(sheetName)}.xlsx`);
  const workbookOut = new ExcelJS.Workbook();
  const sheetOut = workbookOut.addWorksheet('Class Report');
  sheetOut.columns = finalHeaders.map(h => ({ header: h, key: h, width: Math.max(12, h.length + 4) }));
  outRows.forEach(r => sheetOut.addRow(finalHeaders.map(h => r[h])));
  // format header
  sheetOut.getRow(1).font = { bold: true };
  // totals column number format
  const totalCol = finalHeaders.indexOf('Total') + 1;
  if (totalCol > 0) sheetOut.getColumn(totalCol).numFmt = '#,##0.##';
  workbookOut.xlsx.writeFile(xlsxPath).then(()=> {
    console.log('Wrote Excel:', xlsxPath);
  }).catch(err => console.error('Error writing excel', err));

  // 3) PDF (pdfkit)
  const pdfPath = path.join(outDir, `${sanitizeFileName(sheetName)}.pdf`);
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const pdfStream = fs.createWriteStream(pdfPath);
  doc.pipe(pdfStream);
  doc.fontSize(14).text(String(sheetName || ''), { align: 'center' });
  doc.moveDown(0.5);
  // prepare table rows as arrays of strings
  const tableRows = outRows.map(r => finalHeaders.map(h => r[h] === null || r[h] === undefined ? '' : String(r[h])));
  writeTableToPDF(doc, finalHeaders, tableRows, { margin: 50 });
  doc.end();
  pdfStream.on('finish', () => console.log('Wrote PDF:', pdfPath));

  console.log('Wrote report for', sheetName, '->', xlsxPath, csvPath, pdfPath);
});

console.log('Done. Reports placed in', outDir);

function sanitizeFileName(name) {
  return String(name || '').replace(/[^a-z0-9\-_. ]/gi, '_').slice(0,200) || 'report';
}
