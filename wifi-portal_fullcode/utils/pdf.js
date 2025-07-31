const sqlite3 = require('sqlite3').verbose();
const PDFDocument = require('pdfkit');
const db = new sqlite3.Database('./database.db');

function generatePDF(res) {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=codes.pdf');
  doc.pipe(res);

  db.all('SELECT code, forfait_type FROM codes WHERE used=0', [], (err, rows) => {
    rows.forEach((row, i) => {
      doc.text(`${row.code} - ${row.forfait_type}`);
      if ((i+1) % 30 === 0) doc.addPage();
    });
    doc.end();
  });
}

module.exports = { generatePDF };
